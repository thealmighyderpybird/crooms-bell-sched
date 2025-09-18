"use client";

import { useState, useEffect, useRef, type CSSProperties } from "react";
import sanitizeContent from "~/lib/SanitizeContent";
import styles from "~/styles/liveEditor.module.css";
import EditHelpDialog from "~/components/EditHelpDialog";
import {createPortal} from "react-dom";

export default function LiveEdit({ value, onChange, style, preview = false }:
                                 { value?: string, onChange: (newContent: string) => void, style?: CSSProperties, preview?: boolean }
) {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [isHelpEnabled, setIsHelpEnabled] = useState(false);
    const [formats, setFormats] = useState({
        bold: false,
        italic: false,
        underline: false,
        ul: false,
        ol: false,
        a: false,
        rainbow: false,
    });
    const [html, setHtml] = useState(value ?? "");

    // Start LiveEditor initialization
    useEffect(() => {
        const iframe = iframeRef.current; if (!iframe) return;
        const doc = iframe.contentDocument; if (!doc) return;

        doc.open();
        doc.write(`<!doctype html>
            <html lang="en">
                <head>
                    <style>
                        html {
                            background-color: ${getComputedStyle(iframe).getPropertyValue("--mid-pri")};
                            height: 100%;
                        }
                    
                        body {                            
                            --main: black;
                            
                            --sucess: darkgreen;
                            --warn: goldenrod;
                            --alert: darkred;
                            --info: #0078D4;
                        
                            --accent-color: ${getComputedStyle(iframe).getPropertyValue("--accent-color")};
                            --link: var(--accent-color);
                            height: calc(100% - 1rem);
                            background: transparent;
                            font: 11pt system-ui;
                            color-scheme: light;
                            color: var(--main);
                            line-height: 1.3;
                            padding: 0.5rem;
                            margin: 0;
                        }
                        
                        @media screen and (prefers-color-scheme: dark) {
                            body {
                                color-scheme: dark;
                                --main: white;
                            }
                        }
                        
                        a:any-link, a:-webkit-any-link, a.links {
                            text-decoration: underline;
                            color: var(--accent-color);
                            user-select: none;
                        }
                        
                        a:any-link:hover, a:-webkit-any-link:hover, a.links:hover {
                            text-decoration: none;
                        }
                        
                        ul, ol {
                            padding-inline: 20px;
                        }
                        
                        .rainbow, rainbow {
                            animation: anim-rainbow 5s infinite;
                        }
                        
                        @keyframes anim-rainbow {
                            0% {
                                color: hsla(0deg 100% 50%);
                                fill: hsla(0deg 100% 50%);
                            }
                            16.67% {
                                color: hsla(60deg 100% 50%);
                                fill: hsla(60deg 100% 50%);
                            }
                            33.33% {
                                color: hsla(120deg 100% 50%);
                                fill: hsla(120deg 100% 50%);
                            }
                            50% {
                                color: hsla(180deg 100% 50%);
                                fill: hsla(180deg 100% 50%);
                            }
                            66.67% {
                                color: hsla(240deg 100% 50%);
                                fill: hsla(240deg 100% 50%);
                            }
                            83.33% {
                                color: hsla(300deg 100% 50%);
                                fill: hsla(300deg 100% 50%);
                            }
                            100% {
                                color: hsla(360deg 100% 50%);
                                fill: hsla(360deg 100% 50%);
                            }
                        }
                    </style>
                </head>
                <body>${sanitizeContent(html)}</body>
            </html>
        `);
        doc.close();
        doc.body.contentEditable = "true";

        // Update the states of the buttons in the toolbar
        const updateState = () => {
            const sel = doc.getSelection();
            const el = sel?.anchorNode?.parentElement;

            setFormats({
                bold: doc.queryCommandState("bold"),
                italic: doc.queryCommandState("italic"),
                underline: doc.queryCommandState("underline"),
                ul: doc.queryCommandState("insertUnorderedList"),
                ol: doc.queryCommandState("insertOrderedList"),
                a: el?.tagName.toLowerCase() === "a" && el.getAttribute("target") === "CBSHFeed",
                rainbow: el?.tagName.toLowerCase() === "span" && el.classList.contains("rainbow"),
            });
        };

        // Update handler
        const handler = () => {
            setHtml(sanitizeContent(doc.body.innerHTML));
            onChange(sanitizeContent(doc.body.innerHTML.toString()));
        }

        doc.addEventListener("selectionchange", updateState);
        doc.body.addEventListener("input", updateState);
        doc.body.addEventListener("input", handler);

        return () => {
            doc.removeEventListener("selectionchange", updateState);
            doc.body.removeEventListener("input", updateState);
            doc.body.removeEventListener("input", handler);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Mention detection
    useEffect(() => {
        const doc = iframeRef.current?.contentDocument;
        if (!doc) return;

        const handleInput = () => {
            const sel = doc.getSelection();
            if (!sel?.anchorNode) return;
            const textNode = sel.anchorNode;

            // Skip if already inside a mention
            if (textNode.parentElement?.tagName.toLowerCase() === "a" && textNode.parentElement.hasAttribute("mention")) return;

            const text = textNode.textContent ?? "";
            const cursorPos = sel.anchorOffset;

            // Match @word followed by a space
            const match = /@(\w+)\s$/.exec(text.slice(0, cursorPos));
            if (!match) return;

            const mentionText = match[0].trim(); // remove trailing space
            const start = cursorPos - match[0].length;
            const end = cursorPos;
            const parent = textNode.parentNode!;

            const before = text.slice(0, start);
            const after = text.slice(end); // remaining text after space

            if (before) parent.insertBefore(doc.createTextNode(before), textNode);

            // Create mention element
            const a = doc.createElement("a");
            a.className = "links";
            a.setAttribute("mention", "");
            a.textContent = mentionText;
            parent.insertBefore(a, textNode);

            // Create a new text node for text after the space
            const nextSpan = doc.createTextNode(" "); // empty Unicode char to force move to the next node
            parent.insertBefore(nextSpan, textNode);

            if (after) nextSpan.insertBefore(doc.createTextNode(after), null);
            parent.removeChild(textNode);

            // Move the cursor to the new text node
            const range = doc.createRange();
            range.setStart(nextSpan, 1); // after the zero-width space
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        };

        doc.body.addEventListener("input", handleInput);
        return () => doc.body.removeEventListener("input", handleInput);
    }, []);

    useEffect(() => {
        const doc = iframeRef.current?.contentDocument; if (!doc) return;

        const handleKey = async (e: KeyboardEvent) => {
            const isMac = navigator.platform.toUpperCase().includes("MAC");
            const modifier = isMac ? e.metaKey : e.ctrlKey;

            if (modifier && e.key.toLowerCase() === "k") {
                e.preventDefault();

                if (e.shiftKey) removeLink();
                else createLink();
            }

            if (modifier && e.shiftKey && e.key?.toLowerCase() === "v") {
                e.preventDefault();

                // Get plain text from clipboard
                const text = await navigator.clipboard.readText();
                if (!text) return;

                const sel = doc.getSelection();
                if (!sel || sel.rangeCount === 0) return;
                const range = sel.getRangeAt(0);

                range.deleteContents();
                range.insertNode(doc.createTextNode(text));

                // Place the cursor after inserted text
                range.collapse(false);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        };

        doc.addEventListener("keydown", handleKey as (e: KeyboardEvent) => void);
        return () => doc.removeEventListener("keydown", handleKey as (e: KeyboardEvent) => void);
    }, []);

    // Detection for rainbow button
    const updateFormatData = () => {
        const doc = iframeRef.current?.contentDocument; if (!doc) return;
        const sel = doc.getSelection(); const el = sel?.anchorNode?.parentElement;

        setFormats(prev => ({
            ...prev,
            rainbow: el?.tagName.toLowerCase() === "span" && el.classList.contains("rainbow"),
        }));
    };

    // Toggle for rainbow and other custom items
    function toggleWrapSelection(tag: string, attrs: Record<string, string | boolean>) {
        const doc = iframeRef.current?.contentDocument; if (!doc) return;
        const sel = doc.getSelection();
        if (!sel || sel.rangeCount === 0) return;

        const range = sel.getRangeAt(0);
        const container = sel.anchorNode?.parentElement;

        // Check if inside matching element
        if (container && container.tagName.toLowerCase() === tag.toLowerCase()) {
            let matches = true;
            for (const [k, v] of Object.entries(attrs)) {
                const val = container.getAttribute(k);
                matches = matches && (typeof v === "boolean" ? container.hasAttribute(k) : val === v);
            }

            if (matches) {
                // Unwrap: move children out, then remove container
                while (container.firstChild) {
                    container.parentNode?.insertBefore(container.firstChild, container);
                }
                container.remove();
                updateFormatData();
                const htmlContent = sanitizeContent(doc.body.innerHTML);
                setHtml(htmlContent);
                return;
            }
        }

        // Otherwise wrap
        const el = doc.createElement(tag);
        for (const [key, value] of Object.entries(attrs)) {
            if (typeof value === "boolean") {
                if (value) el.setAttribute(key, "");
            } else {
                el.setAttribute(key, value);
            }
        }
        range.surroundContents(el);
        sel.removeAllRanges();
        sel.addRange(range);
        updateFormatData();
        const htmlContent = doc.body.innerHTML;
        setHtml(htmlContent);
    }

    // Command manager for items
    function execCmd(cmd: string, val?: string) {
        const doc = iframeRef.current?.contentDocument;
        if (doc) doc.execCommand(cmd, false, val ?? "");
    }

    // For inserting links
    function createLink() {
        const doc = iframeRef.current?.contentDocument; if (!doc) return;
        const sel = doc.getSelection(); if (!sel || sel.rangeCount === 0) return;

        // If the cursor is already in a link
        const el = sel.anchorNode?.parentElement;
        if (el?.tagName.toLowerCase() === "a" && !el.hasAttribute("mention")) {
            const currentUrl = el.getAttribute("href") ?? "";
            const url = prompt("Edit URL:", currentUrl);
            if (url) {
                el.setAttribute("href", url);
            }
            const htmlContent = doc.body.innerHTML;
            console.log(htmlContent);
            setHtml(htmlContent);
            return;
        }

        // Otherwise, create a new link
        if (sel.rangeCount === 0) return;
        const range = sel.getRangeAt(0);
        const url = prompt("Enter a URL:"); if (!url) return;
        const text = range.toString().trim() || url;

        const a = doc.createElement("a");
        a.href = url;
        a.target = "CBSHFeed";
        a.textContent = text;

        range.deleteContents();
        range.insertNode(a);

        // Move the cursor after the link
        const newRange = doc.createRange();
        newRange.setStartAfter(a);
        newRange.collapse(true);
        sel.removeAllRanges();
        sel.addRange(newRange);

        // Update HTML content
        const htmlContent = doc.body.innerHTML;
        setHtml(htmlContent);
    }

    // For removing links
    function removeLink() {
        const doc = iframeRef.current?.contentDocument;
        if (!doc) return;
        const sel = doc.getSelection();
        if (!sel) return;

        const el = sel.anchorNode?.parentElement;
        if (el?.tagName.toLowerCase() === "a" && !el.hasAttribute("mention")) {
            // Replace the <a> with just its text
            const text = doc.createTextNode(el.textContent || "");
            el.replaceWith(text);

            // Reset cursor after text
            const range = doc.createRange();
            range.setStartAfter(text);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }

    function clearFormatting() {
        const doc = iframeRef.current?.contentDocument;
        if (!doc) return;
        const sel = doc.getSelection();
        if (!sel || sel.rangeCount === 0) return;
        const range = sel.getRangeAt(0);



        if (formats.underline) execCmd("underline");
        if (formats.italic) execCmd("italic");
        if (formats.bold) execCmd("bold");
        if (formats.a) removeLink();

        if (formats.rainbow) toggleWrapSelection("span", { class: "rainbow" });

        // Clone the contents of the selection
        const clonedContents = range.cloneContents();

        // Remove all <font> elements from the cloned content
        const fontElements = clonedContents.querySelectorAll('font');
        fontElements.forEach(fontEl => {
            // Replace <font> with its child nodes (removing the tag but keeping the content)
            const parent = fontEl.parentNode!;
            while (fontEl.firstChild) {
                parent.insertBefore(fontEl.firstChild, fontEl);
            }
            parent.removeChild(fontEl);
        });

        // Remove all <span> elements from the cloned content;
        const spanElements = clonedContents.querySelectorAll('span');
        spanElements.forEach(spanEl => {
            // Replace <span> with its child nodes (removing the tag but keeping the content)
            const parent = spanEl.parentNode!;
            while (spanEl.firstChild) {
                parent.insertBefore(spanEl.firstChild, spanEl);
            }
            parent.removeChild(spanEl);
        });

        // Delete the original content
        range.deleteContents();

        // Insert the cleaned-up content
        range.insertNode(clonedContents);

        // Optional: Collapse the selection if needed
        sel.removeAllRanges();
        sel.addRange(range);

        // Sync state immediately
        setHtml(doc.body.innerHTML);
    }

    // Editor and toolbar
    return <div className={ styles.liveEdit }>
        <div className={ styles.optionBar }>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" onClick={() => execCmd("bold")}
                     className={ styles.icon + isActive(formats.bold) }>
                    <path d="M6.935 4.44A1.5 1.5 0 0 1 7.996 4h4.384C15.016 4 17 6.182 17 8.625a4.63 4.63 0 0 1-.866 2.682c1.077.827 1.866 2.12 1.866 3.813c0 3.112-2.7 4.88-4.88 4.88H8a1.5 1.5 0 0 1-1.5-1.5l-.004-13c0-.397.158-.779.44-1.06M9.5 10.25h2.88c.903 0 1.62-.76 1.62-1.625S13.282 7 12.38 7H9.498zm0 3V17h3.62c.874 0 1.88-.754 1.88-1.88c0-1.13-.974-1.87-1.88-1.87z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" onClick={() => execCmd("italic")}
                     className={ styles.icon + isActive(formats.italic) }>
                    <path d="M9.75 4h8.504a.75.75 0 0 1 .102 1.493l-.102.006h-3.197L10.037 18.5h4.213a.75.75 0 0 1 .742.648l.007.102a.75.75 0 0 1-.648.743L14.25 20h-9.5a.747.747 0 0 1-.746-.75c0-.38.28-.694.645-.743l.101-.007h3.685l.021-.065L13.45 5.499h-3.7a.75.75 0 0 1-.742-.648L9 4.75a.75.75 0 0 1 .648-.743zh8.503z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" onClick={() => execCmd("underline")}
                     className={ styles.icon + isActive(formats.underline) }>
                    <path d="M8.5 4.75a.75.75 0 0 0-1.5 0V12a5 5 0 0 0 10 0V4.75a.75.75 0 0 0-1.5 0V12a3.5 3.5 0 1 1-7 0zM6.75 18.5a.75.75 0 0 0 0 1.5h10.5a.75.75 0 0 0 0-1.5z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" onClick={() => createLink()}
                     className={ styles.icon + isActive(formats.a) }>
                    <path d="M9.25 7a.75.75 0 0 1 .11 1.492l-.11.008H7a3.5 3.5 0 0 0-.206 6.994L7 15.5h2.25a.75.75 0 0 1 .11 1.492L9.25 17H7a5 5 0 0 1-.25-9.994L7 7zM17 7a5 5 0 0 1 .25 9.994L17 17h-2.25a.75.75 0 0 1-.11-1.492l.11-.008H17a3.5 3.5 0 0 0 .206-6.994L17 8.5h-2.25a.75.75 0 0 1-.11-1.492L14.75 7zM7 11.25h10a.75.75 0 0 1 .102 1.493L17 12.75H7a.75.75 0 0 1-.102-1.493zh10z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" onClick={() => execCmd("insertUnorderedList")}
                     className={ styles.icon + isActive(formats.ul) }>
                    <path d="M3.25 17.5a1.25 1.25 0 1 1 0 2.499a1.25 1.25 0 0 1 0-2.499m3.5.5h14.5a.75.75 0 0 1 .102 1.493l-.102.007H6.75a.75.75 0 0 1-.102-1.493zh14.5zm-3.5-7a1.25 1.25 0 1 1 0 2.499a1.25 1.25 0 0 1 0-2.499m3.5.5h14.5a.75.75 0 0 1 .102 1.493L21.25 13H6.75a.75.75 0 0 1-.102-1.493zh14.5zm-3.5-7a1.25 1.25 0 1 1 0 2.499a1.25 1.25 0 0 1 0-2.499m3.5.5h14.5a.75.75 0 0 1 .102 1.493l-.102.007H6.75a.75.75 0 0 1-.102-1.493zh14.5z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" onClick={() => execCmd("insertOrderedList")}
                     className={ styles.icon + isActive(formats.ol) }>
                    <path d="M6 2.75a.75.75 0 0 0-1.434-.307l-.002.003l-.011.024l-.056.108a4 4 0 0 1-.238.385c-.217.312-.524.662-.906.901a.75.75 0 1 0 .794 1.272q.188-.117.353-.248V7.25a.75.75 0 1 0 1.5 0zm14.5 16a.75.75 0 0 0-.75-.75h-9a.75.75 0 0 0 0 1.5h9a.75.75 0 0 0 .75-.75m0-6.506a.75.75 0 0 0-.75-.75h-9a.75.75 0 0 0 0 1.5h9a.75.75 0 0 0 .75-.75m0-6.494a.75.75 0 0 0-.75-.75h-9a.75.75 0 0 0 0 1.5h9a.75.75 0 0 0 .75-.75M5.15 10.52c-.3-.053-.676.066-.87.26a.75.75 0 0 1-1.06-1.06c.556-.556 1.43-.812 2.192-.677c.397.07.805.254 1.115.605c.316.358.473.825.473 1.352c0 .62-.271 1.08-.606 1.42c-.278.283-.63.511-.906.689l-.08.051a6 6 0 0 0-.481.34H6.25a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75c0-1.313.984-1.953 1.575-2.337l.06-.04c.318-.205.533-.345.69-.504c.134-.136.175-.238.175-.369c0-.223-.061-.318-.098-.36a.42.42 0 0 0-.251-.12M2.97 21.28s.093.084.004.005l.006.005l.013.013a1.4 1.4 0 0 0 .15.125c.095.071.227.158.397.243c.341.17.83.33 1.46.33c.64 0 1.196-.182 1.601-.54c.408-.36.61-.858.595-1.36a1.78 1.78 0 0 0-.426-1.1c.259-.306.412-.686.426-1.102a1.73 1.73 0 0 0-.595-1.36C6.196 16.182 5.64 16 5 16c-.63 0-1.119.158-1.46.33a2.6 2.6 0 0 0-.51.334l-.037.033l-.013.013l-.006.005l-.002.003H2.97l-.001.002a.75.75 0 0 0 1.048 1.072l.026-.02a1 1 0 0 1 .166-.101c.159-.08.42-.17.79-.17c.36 0 .536.099.608.163a.23.23 0 0 1 .088.187a.33.33 0 0 1-.123.23c-.089.078-.263.17-.573.17a.75.75 0 0 0 0 1.5c.31 0 .484.09.573.167c.091.08.121.166.123.231a.23.23 0 0 1-.088.188c-.072.063-.247.163-.608.163a1.75 1.75 0 0 1-.79-.17a1 1 0 0 1-.192-.122a.75.75 0 0 0-1.048 1.072m.002-4.562c.007-.005.2-.166 0 0" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" onClick={() => toggleWrapSelection("span", { class: "rainbow" })}
                     className={ styles.icon + " rainbow" + isActive(formats.rainbow) }>
                    <path d="M5 4.75A.75.75 0 0 1 5.75 4h12.5a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0V5.5h-4.75v13h1.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5h1.5v-13H6.5v1.25a.75.75 0 0 1-1.5 0z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" onClick={() => clearFormatting()} className={ styles.icon }>
                    <path d="M2.761 14.001a.84.84 0 0 1-.55-.18a.6.6 0 0 1-.211-.464q0-.164.093-.408L6.02 2.71Q6.29 2 7.018 2q.685 0 .956.702l3.934 10.246q.093.245.093.408q0 .277-.22.465a.8.8 0 0 1-.541.179q-.542 0-.745-.563l-1.083-2.92h-4.83l-1.075 2.92Q3.304 14 2.762 14m2.26-4.731H8.98L7.025 3.902h-.05zm7.77 5.46l5.48 5.48l4.157-4.156a1.95 1.95 0 0 0 .002-2.758l-2.724-2.724a1.947 1.947 0 0 0-2.759.001zm1.957-3.372L13 13.106V2.756a.77.77 0 0 1 .195-.544a.68.68 0 0 1 .51-.211q.309 0 .504.21q.203.212.203.545v4.073h.032q.405-.731 1.112-1.144a3.13 3.13 0 0 1 1.598-.414q1.599 0 2.58 1.192q.982 1.194.982 3.173q0 .264-.017.514l-.286-.286a2.9 2.9 0 0 0-1.161-.715q-.095-1.098-.63-1.793q-.648-.844-1.768-.844q-1.08 0-1.769.868q-.681.861-.681 2.256q0 .999.345 1.722m2.463 9.914L11.73 15.79l-1.157 1.157a1.95 1.95 0 0 0-.002 2.759l2.724 2.723a1.94 1.94 0 0 0 1.208.564L14.5 23H20a.75.75 0 1 0 0-1.5h-3.02z" />
                </svg>
            </div>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" onClick={() => setIsHelpEnabled(true)} className={ styles.icon }>
                    <path d="M12 4a5 5 0 0 0-5 5a1 1 0 0 0 2 0c0-1.658 1.342-3 3-3s3 1.342 3 3c0 .816-.199 1.294-.438 1.629c-.262.365-.625.638-1.128.985l-.116.078c-.447.306-1.023.699-1.469 1.247c-.527.648-.849 1.467-.849 2.561v.5a1 1 0 1 0 2 0v-.5c0-.656.178-1.024.4-1.299c.257-.314.603-.552 1.114-.903l.053-.037c.496-.34 1.133-.786 1.62-1.468C16.7 11.081 17 10.183 17 9a5 5 0 0 0-5-5m0 17.25a1.25 1.25 0 1 0 0-2.5a1.25 1.25 0 0 0 0 2.5" />
                </svg>
            </div>
        </div>
        <iframe ref={iframeRef} className={ styles.liveEditor } style={style ?? {}} />
        { preview && <div dangerouslySetInnerHTML={{ __html: sanitizeContent(html) }} /> }
        { isHelpEnabled && createPortal(<EditHelpDialog setIsActive={setIsHelpEnabled} />, document.getElementById("modal-portal")!) }
    </div>;
};

// For toolbar active states
const isActive = (state: boolean) => state ? ` ${styles.active}` : "";