import React from 'react';

const Promotions = () => {
  const promotions = [
    {
      code: 'WELCOME2024',
      discount: 15,
      description: 'New member special discount',
      validUntil: '2024-03-31',
      bgColor: 'bg-gradient-to-r from-purple-500 to-pink-500'
    },
    {
      code: 'EARLYBIRD',
      discount: 10,
      description: 'Early morning sessions discount',
      validUntil: '2024-04-30',
      bgColor: 'bg-gradient-to-r from-cyan-500 to-blue-500'
    },
    {
      code: 'SQUAD5',
      discount: 5,
      description: 'Group booking discount',
      validUntil: '2024-12-31',
      bgColor: 'bg-gradient-to-r from-amber-500 to-red-500'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Special Offers
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Use these exclusive coupon codes to save on your membership
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {promotions.map((promo) => (
            <div
              key={promo.code}
              className={`${promo.bgColor} rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105`}
            >
              <div className="p-6 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-lg font-semibold opacity-75">SAVE</p>
                    <p className="text-4xl font-bold">{promo.discount}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm opacity-75">Use Code:</p>
                    <p className="text-xl font-mono font-bold tracking-wider">
                      {promo.code}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm opacity-90">{promo.description}</p>
                  <p className="mt-2 text-xs opacity-75">
                    Valid until: {new Date(promo.validUntil).toLocaleDateString()}
                  </p>
                </div>
                <button 
                  onClick={() => navigator.clipboard.writeText(promo.code)}
                  className="mt-4 px-4 py-2 bg-white bg-opacity-20 rounded-full text-sm hover:bg-opacity-30 transition-colors"
                >
                  Copy Code
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Promotions;