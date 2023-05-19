import React from 'react'
import LoadingBar from 'react-top-loading-bar'

const Loadingbar = ({progress,setProgress}) => {

    return (
      <div>
        <LoadingBar
          color={'blue'}
          progress={progress}
          height={3}
          onLoaderFinished={() => setProgress(0)}
        />
        <button onClick={() => setProgress(progress + 10)}></button>
        <button onClick={() => setProgress(progress + 20)}></button>
        <button onClick={() => setProgress(100)}></button>
        <br />
      </div>
    )
}

export default Loadingbar
