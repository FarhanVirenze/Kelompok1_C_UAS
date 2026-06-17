const PrimaryCard = ({ visitors }) => {
  return (
    <div className="bg-gradient-to-r from-[#007aff]/10 to-[#5856d6]/10 dark:from-[#00f2fe]/10 dark:to-[#8a2be2]/10 border border-[#007aff]/20 dark:border-[#00f2fe]/20 rounded-xl p-5 relative overflow-hidden group transition-colors duration-500">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      <div className="relative z-10">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2 transition-colors duration-500">
          🎉 Congratulations!
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed transition-colors duration-500">
          You currently have <strong className="text-[#007aff] dark:text-[#00f2fe]">{visitors?.length || 0}</strong> active users engaging with your content on Watchery. Keep up the great work!
        </p>
      </div>
    </div>
  );
};

export default PrimaryCard;
