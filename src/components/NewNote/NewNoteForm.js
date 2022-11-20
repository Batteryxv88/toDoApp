import { useState } from "react";
import "./NewNoteForm.css";
import { db, storage } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const NewNoteForm = (props) => {
  /** Setting title input value to state */
  const [title, setTitle] = useState("");

  /** Setting description input value to state */
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState(0);

  /** Submit form handler. Send data to firebase, clear input states. */
  const formSubmitHandler = async (evt) => {
    evt.preventDefault();
    props.onCansel();
    if (title !== "") {
      try {
        await addDoc(collection(db, "todos"), {
          title,
          description,
          isDone: false,
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      setTitle("");
      setDescription("");
    }
  };

  /** Set title value from input to state */
  const changeTitleHandler = (evt) => {
    setTitle(evt.target.value);
  };

  /** Set description value from input to state */
  const changeDescriptionHandler = (evt) => {
    setDescription(evt.target.value);
  };

  const addFileHandler = (file) => {
    if (!file) return;
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => console.log(url));
      }
    );
  };

  return (
    <div className="note-form">
      <form className="form" onSubmit={formSubmitHandler}>
        <div className="form__wrapper">
          <input
            autoFocus
            className="form__input form__input_title"
            onChange={changeTitleHandler}
            placeholder="Title"
          ></input>
          <textarea
            className="form__input form__input_description"
            onChange={changeDescriptionHandler}
            placeholder="Description"
          ></textarea>
        </div>
        <div className="form__wrapper">
          <label className="input-file">
            <input
              className="input-file__input"
              name="file"
              type="file"
              onChange={addFileHandler}
            ></input>
            <span className="input-file__span">Select file</span>
          </label>
          <button className="form__button form__button_submit" type="submit">
            Add note
          </button>
          <button
            className="form__button form__button_cansel"
            onClick={props.onCansel}
          >
            Cansel
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewNoteForm;
