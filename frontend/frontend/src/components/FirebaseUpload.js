import { useState } from "react"
import { storage } from './FirebaseConfig';
import "firebase/storage";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import "./FirebaseUpload.css";

function FirebaseUpload() {
    const [imgUrl, setImgUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);
    const [videoPreviewUrl, setVideoPreviewUrl] = useState(null); //for video preview
 
    // Handles input change event and updates state
    function handleSubmit(e) {
        e.preventDefault()
        const file = e.target[0]?.files[0]
        if (!file) { alert("Please choose a file first!") }
        const storageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        const reader = new FileReader();
        reader.onload = () => {
            setVideoPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);

    uploadTask.on("state_changed",
        (snapshot) => {
            const progress =
                Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgresspercent(progress);
        },
        (error) => {
            alert(error);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setImgUrl(downloadURL)
            });
        }
    );
}

return (
    <div className="App">
      <form onSubmit={handleSubmit} className='form'>
        <input type='file' accept=".mp4" />
        <button type='submit'>Upload</button>
      </form>

      {
        !imgUrl &&
        <div className='outerbar'>
          <div className='innerbar' style={{ width: `${progresspercent}%` }}>{progresspercent}%</div>
        </div>
      }

      { videoPreviewUrl && (
        <video controls width="250">
            <source src={videoPreviewUrl} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
    
export default FirebaseUpload;