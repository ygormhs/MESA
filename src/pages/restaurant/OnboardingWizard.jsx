import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

// Steps Components
import StepInfo from './onboarding/steps/StepInfo';
import StepLocation from './onboarding/steps/StepLocation';
import StepHours from './onboarding/steps/StepHours';
import StepPhotos from './onboarding/steps/StepPhotos';
import StepPromo from './onboarding/steps/StepPromo';
import StepSuccess from './onboarding/steps/StepSuccess';

const STEPS = [
    { id: 1, title: 'Sobre o Restaurante' },
    { id: 2, title: 'Localização' },
    { id: 3, title: 'Horários' },
    { id: 4, title: 'Fotos' },
    { id: 5, title: 'Primeira Promoção' },
    { id: 6, title: 'Conclusão' }
];

export default function OnboardingWizard() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        // Step 1
        name: '',
        cnpj: '',
        description: '',
        priceRange: '$$',
        cuisines: [],

        // Step 2
        cep: '',
        address: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',

        // Step 3
        hours: {},

        // Step 4
        photos: [],

        // Step 5
        promo: {
            type: 'percent',
            value: '',
            description: '',
            days: ['seg', 'ter', 'qua', 'qui', 'sex'],
            timeStart: '18:00',
            timeEnd: '23:00'
        }
    });

    const updateData = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const isStepValid = () => {
        if (currentStep === 1) return formData.name.length > 0;
        if (currentStep === 2) return formData.address.length > 0;
        return true;
    };

    const saveRestaurant = async () => {
        setIsSaving(true);
        try {
            // 1. Create Restaurant
            const { data: restaurant, error: restError } = await supabase
                .from('restaurants')
                .insert({
                    profile_id: user.id,
                    name: formData.name,
                    description: formData.description,
                    address: `${formData.address}, ${formData.number}`,
                    city: formData.city,
                    neighborhood: formData.neighborhood,
                    zip_code: formData.cep,
                    price_range: formData.priceRange.length, // '$' -> 1, '$$' -> 2
                    cuisine_types: formData.cuisines,
                    opening_hours: formData.hours,
                })
                .select()
                .single();

            if (restError) throw restError;

            // 2. Create Promotion (if any)
            if (formData.promo.value) {
                const { error: promoError } = await supabase
                    .from('promotions')
                    .insert({
                        restaurant_id: restaurant.id,
                        title: `Promoção de Boas-vindas`,
                        description: formData.promo.description,
                        discount_percentage: parseInt(formData.promo.value),
                        valid_times: { start: formData.promo.timeStart, end: formData.promo.timeEnd },
                        valid_days: formData.promo.days,
                    });
                if (promoError) throw promoError;
            }

            setCurrentStep(prev => prev + 1); // Go to Success
        } catch (error) {
            console.error('Error saving restaurant:', error);
            alert('Erro ao salvar restaurante: ' + error.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleNext = () => {
        if (currentStep === 5) {
            saveRestaurant();
        } else if (currentStep < STEPS.length) {
            setCurrentStep(prev => prev + 1);
        } else {
            navigate('/restaurant/dashboard');
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
            {/* Header / Progress */}
            <div className={`w-full max-w-3xl px-6 mb-8 ${currentStep === 6 ? 'opacity-0 pointer-events-none' : ''}`}>
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold text-gray-900">Configuração do Restaurante</h1>
                    <span className="text-sm font-medium text-gray-500">Passo {currentStep} de {STEPS.length}</span>
                </div>

                {/* Progress Bar */}
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-mesa-green transition-all duration-300 ease-out"
                        style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
                    />
                </div>
            </div>

            {/* Main Content Card */}
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                {currentStep === 1 && <StepInfo data={formData} updateData={updateData} />}
                {currentStep === 2 && <StepLocation data={formData} updateData={updateData} />}
                {currentStep === 3 && <StepHours data={formData} updateData={updateData} />}
                {currentStep === 4 && <StepPhotos data={formData} updateData={updateData} />}
                {currentStep === 5 && <StepPromo data={formData} updateData={updateData} />}
                {currentStep === 6 && <StepSuccess data={formData} />}
            </div>

            {/* Navigation Buttons (Hide on Success Step) */}
            {currentStep !== 6 && (
                <div className="w-full max-w-3xl px-6 mt-8 flex items-center justify-between">
                    <button
                        onClick={handleBack}
                        disabled={currentStep === 1}
                        className={`
                            flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors
                            ${currentStep === 1
                                ? 'text-gray-300 cursor-not-allowed'
                                : 'text-gray-600 hover:bg-gray-100'}
                        `}
                    >
                        <ChevronLeft size={20} />
                        Voltar
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={!isStepValid() || isSaving}
                        className={`
                            flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all shadow-lg
                            ${isStepValid() && !isSaving
                                ? 'bg-mesa-green text-white hover:bg-green-600 shadow-green-200'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'}
                        `}
                    >
                        {isSaving ? 'Salvando...' : (currentStep === 5 ? 'Finalizar Configuração' : 'Continuar')}
                        <ChevronRight size={20} />
                    </button>
                </div>
            )}

            {/* Show specific button for Step 6 */}
            {currentStep === 6 && (
                <div className="mt-8">
                    <button
                        onClick={() => navigate('/restaurant/dashboard')}
                        className="flex items-center gap-2 px-8 py-3 bg-mesa-green text-white rounded-xl font-bold hover:bg-green-600 transition-all shadow-lg shadow-green-200"
                    >
                        Ir para o Dashboard
                        <ChevronRight size={20} />
                    </button>
                </div>
            )}
        </div>
    );
}
