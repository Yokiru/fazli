import { useScrollReveal } from '../../../hooks/useScrollReveal';
import './Services.css';

// CONFIG: Service categories for marquee/display
const serviceCategories = ['Logo Design', 'E-sports', 'Social Media', 'Branding'];

// CONFIG: Services data - Edit pricing and descriptions here
const servicesData = [
    {
        id: 1,
        name: 'Logo Design',
        description: 'Desain logo profesional untuk brand dan bisnis Anda. Dari konsep hingga final, setiap detail dibuat untuk menciptakan identitas visual yang memorable.',
        price: 'Hubungi',
        duration: '3-5 hari',
        features: [
            'Desain unik dan original',
            'Multiple konsep & revisi',
            'File siap cetak & digital',
            'Panduan penggunaan logo',
        ],
    },
    {
        id: 2,
        name: 'E-sports Design',
        description: 'Poster tournament, player announcement, champion graphics untuk komunitas gaming. Desain yang energik dan eye-catching.',
        price: 'Hubungi',
        duration: '1-3 hari',
        features: [
            'Desain dinamis & energik',
            'Cocok untuk social media',
            'Template reusable',
            'Turnaround cepat',
        ],
    },
    {
        id: 3,
        name: 'Store Branding',
        description: 'Visual identity lengkap untuk toko online maupun offline. Dari logo hingga packaging, semua dirancang secara kohesif.',
        price: 'Hubungi',
        duration: '5-7 hari',
        features: [
            'Identitas visual lengkap',
            'Konsistensi brand',
            'Asset siap pakai',
            'Panduan brand guidelines',
        ],
    },
    {
        id: 4,
        name: 'Social Media Design',
        description: 'Desain feed Instagram dan konten media sosial yang eye-catching. Tingkatkan engagement dengan visual yang menarik.',
        price: 'Hubungi',
        duration: '1-2 hari',
        features: [
            'Desain feed yang konsisten',
            'Template editable',
            'Optimasi untuk engagement',
            'Multiple format & size',
        ],
    },
];

/**
 * Services Section Organism
 * Displays services with details and features
 */
export function Services() {
    useScrollReveal();

    return (
        <section id="services" className="services container">
            <div className="services__header reveal-text">
                <h2 className="services__title">Layanan</h2>
                <div className="services__categories">
                    {serviceCategories.map((cat, index) => (
                        <span key={cat} className="services__category">
                            {cat}
                            {index < serviceCategories.length - 1 && (
                                <span className="services__category-dot">•</span>
                            )}
                        </span>
                    ))}
                </div>
            </div>

            <div className="services__list reveal-group">
                {servicesData.map((service, index) => (
                    <ServiceItem key={service.id} service={service} index={index + 1} />
                ))}
            </div>
        </section>
    );
}

interface ServiceItemProps {
    service: {
        id: number;
        name: string;
        description: string;
        price: string;
        duration: string;
        features: string[];
    };
    index: number;
}

function ServiceItem({ service, index }: ServiceItemProps) {
    return (
        <article className="service-item">
            <div className="service-item__header">
                <div className="service-item__title-row">
                    <span className="service-item__number">{index}.</span>
                    <h3 className="service-item__name">{service.name}</h3>
                </div>
                <div className="service-item__meta">
                    <span className="service-item__price">Starts at {service.price}</span>
                    <span className="service-item__separator">•</span>
                    <span className="service-item__duration">⏱ {service.duration}</span>
                </div>
            </div>
            <div className="service-item__content">
                <p className="service-item__description">{service.description}</p>
                <ul className="service-item__features">
                    {service.features.map((feature, idx) => (
                        <li key={idx} className="service-item__feature">
                            <span className="service-item__feature-dot">●</span>
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>
        </article>
    );
}
