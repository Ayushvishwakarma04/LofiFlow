import React from 'react'

const futureScope = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-900 via-black to-gray-900 p-8">
      <div className="bg-black/70 backdrop-blur-lg rounded-2xl shadow-2xl max-w-xl w-full p-8 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-lime-400 mb-4 flex items-center gap-2">
          <span role="img" aria-label="crystal ball">🔮</span> Future Scope
        </h1>
        <ul className="text-lg text-gray-200 space-y-4 mt-6 list-disc list-inside">
          <li><span className="font-semibold text-lime-300">Integrate user authentication</span> to allow personalized experiences and data persistence.</li>
          <li><span className="font-semibold text-lime-300">Enable users to upload and save custom background images or videos</span>, creating a more immersive environment.</li>
          <li><span className="font-semibold text-lime-300">Add support for uploading or linking personal lo-fi tracks</span>, giving users control over their music playlist.</li>
          <li><span className="font-semibold text-lime-300">Implement cloud storage</span> (e.g., Firebase or Supabase) to store user assets and preferences securely.</li>
          <li><span className="font-semibold text-lime-300">Introduce a theme system</span> (light/dark mode, blur overlays, etc.) for better visual customization.</li>
          <li><span className="font-semibold text-lime-300">Expand to include real-time visualizations or ambient animations</span> synced with audio.</li>
          <li><span className="font-semibold text-lime-300">Offer a social sharing feature</span> where users can share their setups or music combinations.</li>
          <li><span className="font-semibold text-lime-300">Make the app PWA-ready</span> (Progressive Web App) for mobile-friendly offline lo-fi listening.</li>
        </ul>
      </div>
    </div>
  )
}

export default futureScope
