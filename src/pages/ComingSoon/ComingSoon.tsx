import { Button } from '../../components/atoms/Button/Button';
import { Header } from '../../components/organisms/Header/Header';
import { Footer } from '../../components/organisms/Footer/Footer';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './ComingSoon.css';

export function ComingSoonPage() {
    useScrollReveal();

    return (
        <div className="coming-soon-page">
            <Header />
            <main className="coming-soon-main container">
                <div className="coming-soon__content reveal-text">
                    <h1 className="coming-soon__title">Work</h1>
                    <p className="coming-soon__subtitle">
                        Selected projects and case studies are<br />
                        <span className="text-primary">coming soon</span>.
                    </p>
                    <div className="coming-soon__actions reveal-delay-200">
                        <Button href="/">Back to Home</Button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
