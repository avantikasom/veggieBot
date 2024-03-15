import { useState, useRef } from "react";

// import tensorflow libraries
// import * as tf from "@tensorflow/tfjs";

// const labels = [
//   "Brinjal",
//   "Carrot",
//   "Chilli",
//   "Garlic",
//   "Ginger",
//   "Onion",
//   "Potato",
//   "Tomato",
// ];

function App() {
  const [file, setFile] = useState(null);
  //   const [model, setModel] = useState(null);
  const [result, setResult] = useState("");

  const ref = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    //   async function getResult() {
    const data = new FormData();
    // data.append("image", ref.current);
    // const tensor = tf.browser
    //   .fromPixels(ref.current)
    //   .resizeNearestNeighbor([128, 128])
    //   .expandDims()
    //   .toFloat();

    // const data = new Blob(tf.);

    //   console.log(tensor);

    // data.append("image", tensor.dataSync());

    //   console.log(tensor);
    data.append("image", file);
    console.log(file);

    try {
      fetch(import.meta.env.VITE_BACKEND_URI + "upload", {
        method: "POST",
        //   headers:{
        //     "Content-Type" : "multi"
        //   },
        body: data,
      })
        .then((res) => res.json())
        .then((data) => setResult(data.data));

      // setResult(labels[response.json().data]);
      // setResult();
    } catch (error) {
      console.log(error);
    }
    // }

    // getResult();

    // const tensor = tf.browser
    //   .fromPixels(ref.current)
    //   .resizeNearestNeighbor([128, 128])
    //   .expandDims()
    //   .toFloat();

    // const prediction = await model.predict(tensor).data();
    // setResult(labels[prediction.indexOf(Math.max(...prediction))]);
    // console.log(result);

    // console.log(prediction);
  }

  //   useEffect(() => {
  //     async function fetchModel() {
  //       const MODEL_URL = "/model/model.json";

  //       try {
  //         const response = await tf.loadLayersModel(MODEL_URL);
  //         setModel(response);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     }

  //     fetchModel();

  //     // getResult();
  //   }, []);

  return (
    <>
      <div
        className="relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover"
        // style={{
        //   backgroundImage:
        //     "url(https://images.unsplash.com/photo-1621243804936-775306a8f2e3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)",
        // }}
      >
        <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
        <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
          <div className="text-center">
            <h2 className="mt-5 text-3xl font-bold text-gray-900">VeggieBot</h2>
            <p className="mt-2 text-sm text-gray-400">
              AI-powered vegetable identification app
            </p>
          </div>
          <form className="mt-8 space-y-3" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold text-gray-500 tracking-wide">
                Predicted result
              </label>
              <input
                className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                type="string"
                value={result}
                placeholder="e.g., Garlic"
                readOnly
              />
            </div>
            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold text-gray-500 tracking-wide">
                Attach Document
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                  {(file && (
                    <img
                      className="w-full h-full"
                      ref={ref}
                      src={URL.createObjectURL(file)}
                    />
                  )) || (
                    <div className="h-full w-full text-center flex flex-col items-center justify-center">
                      {/* <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-blue-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg> */}
                      <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                        <img
                          className="has-mask h-36 object-center"
                          src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                          alt="freepik image"
                        />
                      </div>
                      <p className="pointer-none text-gray-500 ">
                        <span className="text-sm">Drag and drop</span> files
                        here <br /> or{" "}
                        <p className="text-blue-600 hover:underline cursor-pointer">
                          select a file
                        </p>{" "}
                        from your computer
                      </p>
                    </div>
                  )}

                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                    accept="image/*"
                  />
                </label>
              </div>
            </div>
            <p className="text-sm text-gray-300">
              <span>File type: jpeg, jpg, png or any other type of image</span>
            </p>
            <div>
              <button
                type="submit"
                className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
