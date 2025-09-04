import sanitizeHtml from "sanitize-html";

const SanitizeContent = (html: string) => sanitizeHtml(html, {
    allowedTags: [
        "address", "h1", "h2", "h3", "h4", "h5", "h6", "hgroup", "blockquote", "dd", "div",
        "dl", "dt", "figcaption", "figure", "hr", "li", "main", "ol", "p", "pre", "img",
        "ul", "a", "abbr", "b", "bdi", "bdo", "br", "cite", "code", "data", "dfn",
        "em", "i", "kbd", "mark", "q", "rb", "rp", "rt", "rtc", "ruby", "s", "samp",
        "small", "span", "strong", "sub", "sup", "time", "u", "var", "wbr", "caption",
        "col", "colgroup", "table", "tbody", "td", "tfoot", "th", "thead", "tr", "rainbow"
    ],
    disallowedTagsMode: "discard",
    allowedAttributes: {
        a: [ "href", "name", "target" ],
        img: [ "src", "srcset", "alt", "title", "width", "height", "loading" ],
        "*": [ "mention", "class" ]
    },
    allowedClasses: {
        a: [ "links" ],
        "*": [ "rainbow" ],
    },
    selfClosing: [ "img", "br", "hr", "area", "base", "basefont", "input" ],
    // URL schemes we permit
    allowedSchemes: [ "http", "https", "ftp", "mailto", "tel" ],
    allowedSchemesByTag: {},
    allowedSchemesAppliedToAttributes: [ "href", "src", "cite" ],
    allowProtocolRelative: true,
    enforceHtmlBoundary: false,
    parseStyleAttributes: true
});

export default SanitizeContent;