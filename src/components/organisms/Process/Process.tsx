import { Button } from '../../atoms/Button/Button';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import './Process.css';

// CONFIG: Process steps data
const processSteps = [
    {
        id: 1,
        title: 'Diskusi & Konsultasi',
        description: 'Kita mulai dengan memahami kebutuhan dan visi Anda. Saya akan menggali informasi tentang brand, target audience, dan preferensi desain.',
    },
    {
        id: 2,
        title: 'Konsep & Sketsa',
        description: 'Saya membuat beberapa konsep awal dan sketsa untuk mendapatkan arah desain yang tepat sebelum masuk ke tahap eksekusi.',
    },
    {
        id: 3,
        title: 'Desain & Revisi',
        description: 'Proses pembuatan desain dengan detail tinggi. Anda bisa request revisi untuk memastikan hasil sesuai ekspektasi.',
    },
    {
        id: 4,
        title: 'Final & Delivery',
        description: 'Setelah disetujui, saya akan mengirimkan file final dalam berbagai format yang Anda butuhkan.',
    },
];

/**
 * Process Section Organism
 * Displays vertical list of process steps
 */
export function Process() {
    useScrollReveal();

    return (
        <section id="process" className="process container">
            <div className="process__header reveal-text">
                <h2 className="process__title">Proses Kerja</h2>
                <Button href="#contact" variant="ghost" size="small">
                    Mulai Project →
                </Button>
            </div>

            <div className="process__list reveal-group">
                {processSteps.map((step) => (
                    <ProcessStep key={step.id} step={step} />
                ))}
            </div>
        </section>
    );
}

interface ProcessStepProps {
    step: {
        id: number;
        title: string;
        description: string;
    };
}

function ProcessStep({ step }: ProcessStepProps) {
    return (
        <article className="process-step">
            <div className="process-step__header">
                <span className="process-step__number">{step.id}.</span>
                <h3 className="process-step__title">{step.title}</h3>
            </div>
            <p className="process-step__description">{step.description}</p>
        </article>
    );
}
