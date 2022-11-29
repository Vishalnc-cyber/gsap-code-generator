import "../App.css";

export const Editor = ({ placeHolder, eventHandler, onKeyDown, code }) => {
    // console.log(code)
    return (
        <div className="editor-container">
            <textarea
                readonly="true"
                className="editor"
                placeholder={placeHolder}
                onChange={eventHandler}
                defaultValue={code}
            ></textarea>
        </div>
    );
};