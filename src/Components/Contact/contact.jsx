import React from 'react'

const contact = () => {
  return (
    <div>
<section className="text-gray-700 body-font relative">
  <div className="absolute inset-0 bg-gray-300">
    <iframe width="100%" height="100%" frameBorder={0} marginHeight={0} marginWidth={0} title="map" scrolling="no" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13288.743993025113!2d73.1016374!3d33.626419!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfeb3b8c2bcdf5%3A0xdf1dbd8df7f8b6c1!2sHafeez%20Shopping%20Centre!5e0!3m2!1sen!2s!4v1720971354704!5m2!1sen!2s" style={{filter: 'grayscale(1) contrast(1.2) opacity(0.4)'}} />
  </div>

  
  <div className="container px-5 py-24 mx-auto flex">
    <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10">
      <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Feedback</h2>
      <p className="leading-relaxed mb-5 text-gray-600">Get in touch with us!</p>
      <input className="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4" placeholder="Email" type="email" />
      <textarea className="bg-white rounded border border-gray-400 focus:outline-none h-32 focus:border-indigo-500 text-base px-4 py-2 mb-4 resize-none" placeholder="Message" defaultValue={""} />
      <button className="text-white bg-teal-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
      <p className="text-xs text-gray-500 mt-3">Chicharrones blog helvetica normcore iceland tousled brook viral artisan.</p>
    </div>
  </div>
</section>

    </div>
  )
}

export default contact
