import React, { useCallback } from 'react'
import { useDropzone } from "react-dropzone"
import { useMutation } from '@apollo/react-hooks';
import { sendMessageMutation } from '../../../../graphql/message';

interface Props {
    button?: boolean;
    channelId?: number;
}

export const FileUpload: React.FC<Props> = ({ children, button, channelId }) => {

    const [sendMessage] = useMutation(sendMessageMutation);
    console.log("fileUpload channelId", channelId);
    const onDrop = useCallback(async acceptedFiles => {
        const { data } = await sendMessage({
            variables: {
                channelId,
                file: acceptedFiles[0]
            },
        });
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, noClick: button ? false : true })

    return (
        <div {...getRootProps({ onSubmit: () => { } })}
            style={!button ? {
                position: "relative",
                display: "flex",
                flexDirection: "column-reverse",
                overflowY: "scroll",
            } : {}}
            tabIndex={undefined}
        >
            {!button ? <div
                style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "black",
                    opacity: "0.1",
                    display: isDragActive ? "block" : "none"
                }}
            >
                <p style={{
                    position: "absolute",
                    color: "white",
                    fontSize: "7rem",
                    top: "50%",
                    left: "50%",
                    marginRight: "-50%",
                    transform: "translate(-50%, -50%)",
                }}>Drop files here</p>
            </div> : <input {...getInputProps()} />}
            {children}
        </div >
    )
}