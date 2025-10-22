"use client";

import type Post from "~/types/ProwlerPost";
import ReportDialog from "./ReportDialog";
import DeleteDialog from "./DeleteDialog";
import styles from "./prowler.module.css";
import { createPortal } from "react-dom";
import EditDialog from "./EditDialog";
import useAlert from "~/AlertContext";
import type User from "~/types/user";
import { useState } from "react";

export default function ActionArea({ session, post, sid, uid }: { session: User, post: Post, sid: string, uid: string }) {
    const [reportDialogEnabled, setReportDialogEnabled] = useState(false);
    const [deleteDialogEnabled, setDeleteDialogEnabled] = useState(false);
    const [editDialogEnabled, setEditDialogEnabled] = useState(false);
    const [menuEnabled, setMenuEnabled] = useState(false);
    const { createAlertBalloon } = useAlert();

    return <div className={ styles.actionBar }>
        { uid === post.uid && <button className={ styles.actionButton } title="Edit Post" onClick={() => setEditDialogEnabled(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className={ styles.actionIcon }>
                <path d="M32.206 6.025a6.907 6.907 0 1 1 9.768 9.767L39.77 18L30 8.23zM28.233 10L8.038 30.197a6 6 0 0 0-1.572 2.758L4.039 42.44a1.25 1.25 0 0 0 1.52 1.52l9.487-2.424a6 6 0 0 0 2.76-1.572l20.195-20.198z" />
            </svg>
        </button> }
        { uid === post.uid && <button className={ styles.actionButton } title="Delete Post" onClick={() => setDeleteDialogEnabled(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className={ styles.actionIcon }>
                <path d="M20 10.5v.5h8v-.5a4 4 0 0 0-8 0m-2.5.5v-.5a6.5 6.5 0 1 1 13 0v.5h11.25a1.25 1.25 0 1 1 0 2.5h-2.917l-2 23.856A7.25 7.25 0 0 1 29.608 44H18.392a7.25 7.25 0 0 1-7.224-6.644l-2-23.856H6.25a1.25 1.25 0 1 1 0-2.5zm4 9.25a1.25 1.25 0 1 0-2.5 0v14.5a1.25 1.25 0 1 0 2.5 0zM27.75 19c-.69 0-1.25.56-1.25 1.25v14.5a1.25 1.25 0 1 0 2.5 0v-14.5c0-.69-.56-1.25-1.25-1.25" />
            </svg>
        </button> }
        <button className={ styles.actionButton } title="More Options" onClick={() => setMenuEnabled(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 49" className={ styles.actionIcon }>

                <path d="M16.668 24a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0z" />
                <path d="M28.168 24a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0z" />
                <path d="M36.168 27.5a3.5 3.5 0 1 0 0-7a3.5 3.5 0 0 0 0 7z" />

            </svg>
        </button>
        { menuEnabled && <><div className={ styles.menu }>
            <button className={ styles.actionButton } title="Call Dr. Eason" onClick={(e) => {
                e.stopPropagation(); setMenuEnabled(false);
                createAlertBalloon("Call sent", "Dr. Eason has been called.", 0);
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className={ styles.actionIcon }>
                    <path d="M22.095 6.894c-.78-1.559-2.41-2.82-4.412-2.597c-1.791.199-4.45.865-6.263 3.049c-1.861 2.243-2.555 5.741-1.126 10.982c1.526 5.591 3.792 11.103 6.609 15.55c2.796 4.415 6.24 7.949 10.191 9.304c3.494 1.198 6.166.698 8.115-.618c1.88-1.269 2.912-3.178 3.446-4.5c.598-1.48.204-3.021-.576-4.157l-2.877-4.184a5.25 5.25 0 0 0-5.892-2.037l-3.976 1.243a.68.68 0 0 1-.723-.187c-1.77-2.073-3.753-4.964-4.292-7.89a.33.33 0 0 1 .033-.23c.585-.983 1.592-2.097 2.593-3.072c1.697-1.652 2.34-4.278 1.22-6.516z" />
                </svg>
                <span>Call Dr. Eason</span>
            </button>
            <button className={ styles.actionButton } title="Report Content" onClick={(e) => {
                e.stopPropagation(); setMenuEnabled(false); setReportDialogEnabled(true);
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className={ styles.actionIcon }>
                    <path d="M8.75 6c-.69 0-1.25.56-1.25 1.25v35.5a1.25 1.25 0 1 0 2.5 0V33h31.25a1.25 1.25 0 0 0 1.007-1.99L33.801 19.5l8.456-11.51A1.25 1.25 0 0 0 41.25 6z" />
                </svg>
                <span>Report</span>
            </button>
        </div><CloseArea setActive={setMenuEnabled} /></> }
        { editDialogEnabled && createPortal(<EditDialog post={post} sid={sid} setIsActive={setEditDialogEnabled} />, document.getElementById("modal-portal")!) }
        { deleteDialogEnabled && createPortal(<DeleteDialog post={post} sid={sid} setIsActive={setDeleteDialogEnabled} />, document.getElementById("modal-portal")!) }
        { reportDialogEnabled && createPortal(<ReportDialog post={post} sid={sid} setIsActive={setReportDialogEnabled} />, document.getElementById("modal-portal")!) }
    </div>
};

const CloseArea = ({ setActive }: { setActive: (active: boolean ) => void }) => {
    return <div className={ styles.closeArea } onClick={() => setActive(false)} />
};