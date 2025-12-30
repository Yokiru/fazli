import { Button } from '../../atoms/Button/Button';
import { useInView } from '../../../hooks/useInView';
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
    const [ref, isVisible] = useInView(0.1);

    return (
        <section id="process" className="process container">
            <div ref={ref} className={`process__header fade-in ${isVisible ? 'visible' : ''}`}>
                <h2 className="process__title">Proses Kerja</h2>
                <Button href="#contact" variant="ghost" size="small">
                    Mulai Project →
                </Button>
            </div>

            <div className="process__list">
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
    const [ref, isVisible] = useInView(0.1);

    return (
        <article ref={ref} className={`process-step fade-in ${isVisible ? 'visible' : ''}`}>
            <div className="process-step__header">
                <span className="process-step__number">{step.id}.</span>
                <h3 className="process-step__title">{step.title}</h3>
            </div>
            <p className="process-step__description">{step.description}</p>
        </article>
    );
}
