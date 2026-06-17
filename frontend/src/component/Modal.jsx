const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[100] p-4 transition-colors duration-500">
      <div 
        className="fixed inset-0 bg-gray-900/50 dark:bg-[#0a0a0f]/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      <div className="relative liquid-glass w-full max-w-lg p-6 rounded-2xl z-10 shadow-2xl border border-gray-200 dark:border-white/10 animate-slide-up mx-auto overflow-hidden">
        {/* Accent Top Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#007aff] to-[#34c759] dark:from-[#00f2fe] dark:to-[#8a2be2]"></div>
        
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#007aff] dark:focus:ring-[#00f2fe] z-20"
          onClick={onClose}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <div className="mt-2">
            {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
