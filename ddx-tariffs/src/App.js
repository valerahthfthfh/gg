import React, { useState, useEffect } from 'react';

function App() {
  const [purchasedTariff, setPurchasedTariff] = useState(null);
  const [tg, setTg] = useState(null);

  // Адаптация под Telegram
  useEffect(() => {
    // Для Telegram Mini App
    if (window.Telegram && window.Telegram.WebApp) {
      const webapp = window.Telegram.WebApp;
      webapp.ready();
      webapp.expand(); // Растягиваем на всю высоту
      webapp.setHeaderColor('#ff6b00');
      webapp.setBackgroundColor('#f5f5f5');
      setTg(webapp);
    }
  }, []);

  const tariffs = [
    {
      id: 'infinity',
      title: 'Infinity',
      price: '2 800',
      badge: null
    },
    {
      id: 'infinity-plus',
      title: 'Infinity Plus',
      price: '2 999',
      badge: 'ЛУЧШИЙ ВЫБОР'
    },
    {
      id: 'smart',
      title: 'Smart',
      price: '2 400',
      badge: null
    }
  ];

  const features = [
    'Безымянный доступ во все клубы',
    'Ознакомительная тренировка',
    'Анализ состава тела InBody',
    'Smart Start тренировки',
    '50+ групповых тренировок',
    'Гостевой доступ для друзей',
    'Семейный доступ',
    'SPA-зона',
    '130+ видеотренировок для зала и дома'
  ];

  const handlePurchase = (tariffId, tariffTitle) => {
    setPurchasedTariff(tariffId);
    
    // Показываем уведомление (рабочий способ для всех версий)
    if (tg) {
      // Используем MainButton как уведомление (работает во всех версиях)
      tg.MainButton.setText(`✓ ${tariffTitle} куплен!`);
      tg.MainButton.show();
      tg.MainButton.disable();
      
      // Прячем через 2 секунды
      setTimeout(() => {
        tg.MainButton.hide();
        tg.MainButton.enable();
      }, 2000);
      
      // Вибрация (работает если поддерживается)
      if (tg.HapticFeedback) {
        tg.HapticFeedback.notificationOccurred('success');
      }
    } else {
      // Если не в Telegram, показываем обычный alert
      alert(`Тариф "${tariffTitle}" куплен!`);
    }
  };

  return (
    <div style={{ 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      maxWidth: '100%',
      margin: '0 auto',
      padding: '12px',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh',
      boxSizing: 'border-box'
    }}>
      {/* Шапка */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px',
        padding: '8px 0'
      }}>
        <h1 style={{
          fontSize: '24px',
          margin: 0,
          color: '#ff6b00',
          fontWeight: '600'
        }}>
          DDX Fitness
        </h1>
        {purchasedTariff && (
          <div style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            ✓ Тариф активен
          </div>
        )}
      </div>

      {/* Карточки */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        {tariffs.map((tariff) => (
          <div 
            key={tariff.id} 
            style={{
              border: tariff.id === 'infinity-plus' ? '2px solid #ff6b00' : '1px solid #e0e0e0',
              borderRadius: '16px',
              padding: '20px 16px',
              position: 'relative',
              backgroundColor: 'white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}
          >
            {/* Бейдж */}
            {tariff.badge && (
              <div style={{
                position: 'absolute',
                top: '-8px',
                right: '16px',
                backgroundColor: '#ff6b00',
                color: 'white',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '11px',
                fontWeight: 'bold',
                letterSpacing: '0.5px'
              }}>
                ⭐ {tariff.badge}
              </div>
            )}

            {/* Заголовок и цена */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <h2 style={{
                fontSize: '24px',
                margin: 0,
                color: tariff.id === 'infinity-plus' ? '#ff6b00' : '#333',
                fontWeight: '600'
              }}>
                {tariff.title}
              </h2>
              
              <div style={{
                fontSize: '22px',
                fontWeight: 'bold',
                color: '#333',
                background: '#f8f8f8',
                padding: '6px 12px',
                borderRadius: '20px'
              }}>
                {tariff.price} ₽
                <span style={{
                  fontSize: '12px',
                  fontWeight: 'normal',
                  color: '#999',
                  marginLeft: '4px'
                }}>/мес</span>
              </div>
            </div>

            {/* Список особенностей */}
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: '0 0 20px 0',
              maxHeight: '200px',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch'
            }}>
              {features.map((feature, index) => (
                <li key={index} style={{
                  padding: '8px 0',
                  borderBottom: index < features.length - 1 ? '1px solid #f0f0f0' : 'none',
                  fontSize: '14px',
                  color: '#555',
                  display: 'flex',
                  alignItems: 'flex-start',
                  lineHeight: '1.4'
                }}>
                  <span style={{ 
                    marginRight: '10px', 
                    color: tariff.id === 'infinity-plus' ? '#ff6b00' : '#999',
                    fontSize: '16px'
                  }}>✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            {/* Кнопка */}
            <button
              onClick={() => handlePurchase(tariff.id, tariff.title)}
              disabled={purchasedTariff === tariff.id}
              style={{
                width: '100%',
                padding: '16px',
                backgroundColor: purchasedTariff === tariff.id ? '#4CAF50' : '#ff6b00',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '17px',
                fontWeight: '600',
                cursor: purchasedTariff === tariff.id ? 'default' : 'pointer',
                transition: 'all 0.2s',
                WebkitTapHighlightColor: 'transparent',
                touchAction: 'manipulation',
                boxShadow: purchasedTariff === tariff.id ? 'none' : '0 4px 12px rgba(255,107,0,0.3)'
              }}
            >
              {purchasedTariff === tariff.id ? '✓ КУПЛЕНО' : 'КУПИТЬ'}
            </button>

            {/* Подсказка */}
            {purchasedTariff !== tariff.id && (
              <p style={{
                fontSize: '11px',
                color: '#999',
                textAlign: 'center',
                marginTop: '12px',
                marginBottom: '0'
              }}>
                Нажмите для покупки
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Подвал */}
      <div style={{
        marginTop: '24px',
        padding: '16px',
        backgroundColor: 'white',
        borderRadius: '12px',
        fontSize: '13px',
        color: '#666',
        textAlign: 'center',
        border: '1px solid #f0f0f0'
      }}>
        <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>
          Все клубы DDX Fitness
        </div>
        <div style={{ fontSize: '12px', color: '#999' }}>
          * Цены указаны за месяц
        </div>
      </div>
    </div>
  );
}

export default App;