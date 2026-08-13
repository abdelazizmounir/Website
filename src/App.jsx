import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DevisModal } from './components/DevisModal';
import { WhatsAppButton } from './components/WhatsAppButton';

import { HomePage } from './pages/HomePage';
import { ServicesHubPage } from './pages/ServicesHubPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { NurseryPage } from './pages/NurseryPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedService, setSelectedService] = useState(null);
  const [devisModalOpen, setDevisModalOpen] = useState(false);
  const [defaultDevisService, setDefaultDevisService] = useState('');

  const handleSelectService = (service) => {
    setSelectedService(service);
    setActiveTab(`service-${service.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDevisModal = (serviceName = '') => {
    setDefaultDevisService(serviceName);
    setDevisModalOpen(true);
  };

  const renderCurrentPage = () => {
    if (activeTab.startsWith('service-') && selectedService) {
      return (
        <ServiceDetailPage 
          service={selectedService}
          onBack={() => setActiveTab('services')}
          openDevisModal={handleOpenDevisModal}
          onSelectService={handleSelectService}
        />
      );
    }

    switch (activeTab) {
      case 'home':
        return (
          <HomePage 
            setActiveTab={setActiveTab} 
            onSelectService={handleSelectService} 
            openDevisModal={handleOpenDevisModal} 
          />
        );
      case 'services':
        return (
          <ServicesHubPage 
            onSelectService={handleSelectService} 
            openDevisModal={handleOpenDevisModal} 
          />
        );
      case 'nursery':
        return (
          <NurseryPage 
            openDevisModal={handleOpenDevisModal} 
          />
        );
      case 'portfolio':
        return (
          <PortfolioPage 
            openDevisModal={handleOpenDevisModal} 
          />
        );
      case 'about':
        return (
          <AboutPage 
            openDevisModal={handleOpenDevisModal} 
          />
        );
      case 'contact':
        return <ContactPage />;
      case 'admin':
        return (
          <AdminPage 
            openDevisModal={handleOpenDevisModal} 
            setActiveTab={setActiveTab}
          />
        );
      default:
        return (
          <HomePage 
            setActiveTab={setActiveTab} 
            onSelectService={handleSelectService} 
            openDevisModal={handleOpenDevisModal} 
          />
        );
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        openDevisModal={() => handleOpenDevisModal()} 
      />

      <main style={{ flex: 1 }}>
        {renderCurrentPage()}
      </main>

      <Footer 
        setActiveTab={setActiveTab} 
        openDevisModal={() => handleOpenDevisModal()} 
        onSelectService={handleSelectService} 
      />

      <WhatsAppButton />

      <DevisModal 
        isOpen={devisModalOpen} 
        onClose={() => setDevisModalOpen(false)} 
        defaultService={defaultDevisService}
      />
    </div>
  );
}
