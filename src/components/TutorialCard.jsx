export default function TutorialCard({ tutorial, onAddToCart, showAddToCart }) {
  const getYouTubeEmbedUrl = (url) => {
    const videoId = url.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  return (
    <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-white mb-2">{tutorial.title}</h2>
      {tutorial.video_url && (
        <iframe
          width="100%"
          height="200"
          src={getYouTubeEmbedUrl(tutorial.video_url)}
          title={tutorial.title}
          className="mb-4 rounded-md"
        />
      )}
      {showAddToCart && (
        <button
          onClick={onAddToCart}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}