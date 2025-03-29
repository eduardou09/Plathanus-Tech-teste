
 const Loading = ( backdrop) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-30 backdrop-blur-sm z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
        <span className="ml-4 text-lg text-gray-700">Carregando...</span>
    </div>
    );
};

export default Loading;