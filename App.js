import { useForm } from "react-hook-form";
import { CSVReader } from "react-papaparse";
import React  from "react";

const buttonRef = React.createRef();

function App() {
  // const { register, handleSubmit } = useForm();

  // const onSubmit = (data) => {
  //   console.log(data.dataset[0]);
  // };

   const handleOpenDialog = (e) => {
     // Note that the ref is set async, so it might be null at some point
     if (buttonRef.current) {
       buttonRef.current.open(e);
     }
   };

   const handleOnFileLoad = (data) => {var pnts = 0;
    var sumPoints = 0;

    data.forEach((customer) => {
      const { data } = customer;
      const [id, transaction, date] = data;

      if (transaction > 100) {
        pnts = 2 * (transaction - 100);
        sumPoints += pnts;
      }

      if (transaction > 50) {
        pnts = 1 * (transaction - 50);
        sumPoints += pnts;
      }

      console.log(id, transaction, date, sumPoints);
      sumPoints =0;
    });


   };

   const handleOnError = (err, file, inputElem, reason) => {
     console.log(err);
   };

 


  return (
    // <form onSubmit={handleSubmit(onSubmit)}>
    //   <input {...register("dataset", { required: true })} type="file" />
    //   <button>Submit</button>
    // </form>

    <CSVReader
      ref={buttonRef}
      onFileLoad={handleOnFileLoad}
      onError={handleOnError}
      noClick
      noDrag
     
    >
      {({ file }) => (
        <aside
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: 10,
          }}
        >
          <button
            type="button"
            onClick={handleOpenDialog}
            style={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              width: "40%",
              paddingLeft: 0,
              paddingRight: 0,
            }}
          >
            Browse file
          </button>
          <div
            style={{
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "#ccc",
              height: 45,
              lineHeight: 2.5,
              marginTop: 5,
              marginBottom: 5,
              paddingLeft: 13,
              paddingTop: 3,
              width: "60%",
            }}
          >
            {file && file.name}
          </div>
         
        </aside>
      )}
    </CSVReader>
  );
}

export default App;
