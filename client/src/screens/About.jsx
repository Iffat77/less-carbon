import React from "react";

function About() {
  return (
    <div className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white ">
      <div className=" md:flex justify-between p-4 mx-auto max-w-screen-xl">
        <div className="mx-auto w-full max-w-2xl ">
          <div className="mb-4 lg:mb-6">
            <h2 className="font-zilla mb-4 text-3xl text-left font-bold leading-tight text-gray-900 lg:mb-6 lg:text-4xl ">
              Welcome to Less Carbon: <br></br> <br/> Explore Articles, Share Ideas, and Join Discussions
            </h2>
            <div className="flex flex-col justify-center items-start mb-6">
              <div className="font-wix-made mt-24 p-4 mb-4 overflow-auto text-lg">
                <p className="text-left py-6 border-y">
                  Less Carbon is a platform and community where users can
                  express themselves and connect with like-minded individuals.
                  It provides a space for people to share their voices and
                  engage with others by commenting on articles and even
                  contributing their own written pieces.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
