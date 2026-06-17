import { AiOutlineUser, AiOutlineComment, AiOutlineVideoCamera } from "react-icons/ai";

const SecondaryCard = ({ pill, content, info, gradient, icon }) => {
  const IconComponent = 
    icon === 'user' ? AiOutlineUser :
    icon === 'comment' ? AiOutlineComment :
    AiOutlineVideoCamera;

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-6 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group`}>
      {/* Decorative background pattern */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-xl transition-transform group-hover:scale-150"></div>
      
      <div className="relative z-10 flex justify-between items-start mb-4">
        <div className="bg-white/20 backdrop-blur-md border border-white/20 rounded-lg px-3 py-1">
          <span className="text-white text-sm font-semibold tracking-wide">{pill}</span>
        </div>
        <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
          <IconComponent className="text-white text-xl" />
        </div>
      </div>

      <div className="relative z-10 mt-6">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-2">{content}</h2>
        <p className="text-white/80 text-sm font-medium">{info}</p>
      </div>
    </div>
  );
};

export default SecondaryCard;
