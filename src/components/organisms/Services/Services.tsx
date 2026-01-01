import { useEffect, useState } from 'react';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { supabase } from '../../../lib/supabase';
import type { Service } from '../../../types/database.types';
import './Services.css';

// CONFIG: Service categories for marquee/display
const serviceCategories = ['Logo Design', 'E-sports', 'Social Media', 'Branding'];

/**
 * Services Section Organism
 * Displays services with details and features
 */
export function Services() {
    useScrollReveal();
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const { data, error } = await supabase
                .from('services')
                .select('*')
                .order('id', { ascending: true });

            if (error) {
                console.error('Error fetching services:', error);
            } else {
                setServices(data || []);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
        } finally {
            setLoading(false);
        }
    };

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
                {loading ? (
                    <p>Loading services...</p>
                ) : (
                    services.map((service, index) => (
                        <ServiceItem key={service.id} service={service} index={index + 1} />
                    ))
                )}
            </div>
        </section>
    );
}

interface ServiceItemProps {
    service: Service;
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
