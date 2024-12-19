export default function ChatBubble({string}) {
    return (
      <button className="relative px-4 py-2 border border-gray-300 text-gray-700 rounded-lg bg-white hover:bg-gray-100 shadow-md focus:outline-none focus:ring focus:ring-blue-200">
        <span>{string}</span>
        {/* Tail */}
        <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-b border-gray-300 rotate-45"></div>
      </button>
    );
  }