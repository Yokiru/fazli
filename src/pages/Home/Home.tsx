import '../../App.css';
import { Hero } from '../../components/organisms/Hero/Hero';
import { Projects } from '../../components/organisms/Projects/Projects';
import { Services } from '../../components/organisms/Services/Services';
import { Process } from '../../components/organisms/Process/Process';
import { Footer } from '../../components/organisms/Footer/Footer';

/**
 * Home Page Component
 * Main landing page with all sections
 */
export function HomePage() {
    return (
        <>
            {/* Main Content */}
            <main>
                <Hero />
                <Projects />
                <Services />
                <Process />
            </main>

            {/* Footer with CTA */}
            <Footer />
        </>
    );
}
