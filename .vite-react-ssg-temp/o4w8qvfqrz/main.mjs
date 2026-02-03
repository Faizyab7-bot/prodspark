import { ViteReactSSG } from "vite-react-ssg";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Link, useParams, useNavigate, Outlet, Navigate } from "react-router-dom";
import { useUser, SignIn, SignedIn, UserButton, SignedOut, ClerkProvider, RedirectToSignIn } from "@clerk/clerk-react";
import { Star, Tag, Eye, Heart, Zap, Sparkles, ChevronRight, TrendingUp, ArrowRight, Layers, BarChart3, Users, ShieldCheck, Cpu, Globe, Search, SlidersHorizontal, ChevronDown, Loader2, ArrowLeft, ExternalLink, Info, MessageSquare, Rocket, Upload, Type, Pencil, CreditCard, Image, X, Plus, CheckCircle2, Moon, Sun, Menu, Twitter, Github, Linkedin, Mail, Send } from "lucide-react";
import React3, { Component, useState, useEffect, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import fastCompare from "react-fast-compare";
import invariant from "invariant";
import shallowEqual from "shallowequal";
import { toast, Toaster } from "react-hot-toast";
const calculateQualityScore = (product, averageRating) => {
  return product.views + product.likes.length * 2 + averageRating * 10;
};
const supabaseUrl = "https://qbearzpnvejemznwazhp.supabase.co";
const supabaseAnonKey = "sb_publishable_5AIzFXQlvYT6_Ouk3NUjmw_4HutEpXu";
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const StarRating = ({
  rating,
  max = 5,
  onRatingChange,
  size = 20,
  interactive = false
}) => {
  return /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1", children: [...Array(max)].map((_, i) => /* @__PURE__ */ jsx(
    Star,
    {
      size,
      className: `${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} ${interactive ? "cursor-pointer hover:scale-110 transition-transform" : ""}`,
      onClick: () => interactive && onRatingChange?.(i + 1)
    },
    i
  )) });
};
const ProductCard = ({ product, averageRating }) => {
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      whileHover: { y: -8 },
      className: "group premium-card flex flex-col h-full overflow-hidden",
      children: [
        /* @__PURE__ */ jsxs(Link, { to: `/products/${product.id}`, className: "block relative aspect-[16/10] overflow-hidden", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: `${product.logo_url}?q_auto,f_auto,w_600`,
              alt: product.name,
              loading: "lazy",
              className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" }),
          /* @__PURE__ */ jsxs("div", { className: "absolute top-4 right-4 z-10 flex flex-col gap-2 items-end", children: [
            /* @__PURE__ */ jsx("span", { className: `px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl backdrop-blur-md border border-white/20 ${product.pricing === "Free" ? "bg-green-500/90 text-white" : product.pricing === "Premium" ? "bg-orange-500/90 text-white" : "bg-indigo-600/90 text-white"}`, children: product.pricing }),
            /* @__PURE__ */ jsxs("span", { className: "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] bg-black/60 text-white backdrop-blur-md border border-white/10 flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx(Tag, { size: 10 }),
              product.category
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6 flex flex-col flex-grow", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-3", children: [
            /* @__PURE__ */ jsx(Link, { to: `/products/${product.id}`, className: "hover:text-primary transition-colors", children: /* @__PURE__ */ jsx("h3", { className: "font-extrabold text-xl leading-tight line-clamp-1 tracking-tight", children: product.name }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 bg-yellow-50 dark:bg-yellow-500/10 px-3 py-1 rounded-full text-yellow-700 dark:text-yellow-500 font-black text-[11px] border border-yellow-100 dark:border-yellow-500/20", children: [
              /* @__PURE__ */ jsx(StarRating, { rating: Math.round(averageRating), size: 12 }),
              /* @__PURE__ */ jsx("span", { children: averageRating.toFixed(1) })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-6 font-medium leading-relaxed", children: product.description }),
          /* @__PURE__ */ jsxs("div", { className: "mt-auto pt-6 border-t border-main flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-slate-400 dark:text-slate-500", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-[11px] font-bold", children: [
                /* @__PURE__ */ jsx(Eye, { size: 14, className: "stroke-[2.5]" }),
                product.views.toLocaleString()
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-[11px] font-bold", children: [
                /* @__PURE__ */ jsx(Heart, { size: 14, className: `stroke-[2.5] ${product.likes.length > 0 ? "fill-red-500 text-red-500" : ""}` }),
                product.likes.length
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-[10px] font-black text-primary bg-orange-50 dark:bg-orange-500/10 px-3 py-1.5 rounded-xl border border-orange-100 dark:border-orange-500/20 shadow-sm", children: [
              /* @__PURE__ */ jsx(Zap, { size: 12, fill: "currentColor" }),
              "SCORE: ",
              Math.round(product.quality_score || 0)
            ] })
          ] })
        ] })
      ]
    }
  );
};
var TAG_NAMES = /* @__PURE__ */ ((TAG_NAMES2) => {
  TAG_NAMES2["BASE"] = "base";
  TAG_NAMES2["BODY"] = "body";
  TAG_NAMES2["HEAD"] = "head";
  TAG_NAMES2["HTML"] = "html";
  TAG_NAMES2["LINK"] = "link";
  TAG_NAMES2["META"] = "meta";
  TAG_NAMES2["NOSCRIPT"] = "noscript";
  TAG_NAMES2["SCRIPT"] = "script";
  TAG_NAMES2["STYLE"] = "style";
  TAG_NAMES2["TITLE"] = "title";
  TAG_NAMES2["FRAGMENT"] = "Symbol(react.fragment)";
  return TAG_NAMES2;
})(TAG_NAMES || {});
var SEO_PRIORITY_TAGS = {
  link: { rel: ["amphtml", "canonical", "alternate"] },
  script: { type: ["application/ld+json"] },
  meta: {
    charset: "",
    name: ["generator", "robots", "description"],
    property: [
      "og:type",
      "og:title",
      "og:url",
      "og:image",
      "og:image:alt",
      "og:description",
      "twitter:url",
      "twitter:title",
      "twitter:description",
      "twitter:image",
      "twitter:image:alt",
      "twitter:card",
      "twitter:site"
    ]
  }
};
var VALID_TAG_NAMES = Object.values(TAG_NAMES);
var REACT_TAG_MAP = {
  accesskey: "accessKey",
  charset: "charSet",
  class: "className",
  contenteditable: "contentEditable",
  contextmenu: "contextMenu",
  "http-equiv": "httpEquiv",
  itemprop: "itemProp",
  tabindex: "tabIndex"
};
var HTML_TAG_MAP = Object.entries(REACT_TAG_MAP).reduce(
  (carry, [key, value]) => {
    carry[value] = key;
    return carry;
  },
  {}
);
var HELMET_ATTRIBUTE = "data-rh";
var HELMET_PROPS = {
  DEFAULT_TITLE: "defaultTitle",
  DEFER: "defer",
  ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
  ON_CHANGE_CLIENT_STATE: "onChangeClientState",
  TITLE_TEMPLATE: "titleTemplate",
  PRIORITIZE_SEO_TAGS: "prioritizeSeoTags"
};
var getInnermostProperty = (propsList, property) => {
  for (let i = propsList.length - 1; i >= 0; i -= 1) {
    const props = propsList[i];
    if (Object.prototype.hasOwnProperty.call(props, property)) {
      return props[property];
    }
  }
  return null;
};
var getTitleFromPropsList = (propsList) => {
  let innermostTitle = getInnermostProperty(
    propsList,
    "title"
    /* TITLE */
  );
  const innermostTemplate = getInnermostProperty(propsList, HELMET_PROPS.TITLE_TEMPLATE);
  if (Array.isArray(innermostTitle)) {
    innermostTitle = innermostTitle.join("");
  }
  if (innermostTemplate && innermostTitle) {
    return innermostTemplate.replace(/%s/g, () => innermostTitle);
  }
  const innermostDefaultTitle = getInnermostProperty(propsList, HELMET_PROPS.DEFAULT_TITLE);
  return innermostTitle || innermostDefaultTitle || void 0;
};
var getOnChangeClientState = (propsList) => getInnermostProperty(propsList, HELMET_PROPS.ON_CHANGE_CLIENT_STATE) || (() => {
});
var getAttributesFromPropsList = (tagType, propsList) => propsList.filter((props) => typeof props[tagType] !== "undefined").map((props) => props[tagType]).reduce((tagAttrs, current) => ({ ...tagAttrs, ...current }), {});
var getBaseTagFromPropsList = (primaryAttributes, propsList) => propsList.filter((props) => typeof props[
  "base"
  /* BASE */
] !== "undefined").map((props) => props[
  "base"
  /* BASE */
]).reverse().reduce((innermostBaseTag, tag) => {
  if (!innermostBaseTag.length) {
    const keys = Object.keys(tag);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const lowerCaseAttributeKey = attributeKey.toLowerCase();
      if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) {
        return innermostBaseTag.concat(tag);
      }
    }
  }
  return innermostBaseTag;
}, []);
var warn = (msg) => console && typeof console.warn === "function" && console.warn(msg);
var getTagsFromPropsList = (tagName, primaryAttributes, propsList) => {
  const approvedSeenTags = {};
  return propsList.filter((props) => {
    if (Array.isArray(props[tagName])) {
      return true;
    }
    if (typeof props[tagName] !== "undefined") {
      warn(
        `Helmet: ${tagName} should be of type "Array". Instead found type "${typeof props[tagName]}"`
      );
    }
    return false;
  }).map((props) => props[tagName]).reverse().reduce((approvedTags, instanceTags) => {
    const instanceSeenTags = {};
    instanceTags.filter((tag) => {
      let primaryAttributeKey;
      const keys2 = Object.keys(tag);
      for (let i = 0; i < keys2.length; i += 1) {
        const attributeKey = keys2[i];
        const lowerCaseAttributeKey = attributeKey.toLowerCase();
        if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === "rel" && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === "rel" && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
          primaryAttributeKey = lowerCaseAttributeKey;
        }
        if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === "innerHTML" || attributeKey === "cssText" || attributeKey === "itemprop")) {
          primaryAttributeKey = attributeKey;
        }
      }
      if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
        return false;
      }
      const value = tag[primaryAttributeKey].toLowerCase();
      if (!approvedSeenTags[primaryAttributeKey]) {
        approvedSeenTags[primaryAttributeKey] = {};
      }
      if (!instanceSeenTags[primaryAttributeKey]) {
        instanceSeenTags[primaryAttributeKey] = {};
      }
      if (!approvedSeenTags[primaryAttributeKey][value]) {
        instanceSeenTags[primaryAttributeKey][value] = true;
        return true;
      }
      return false;
    }).reverse().forEach((tag) => approvedTags.push(tag));
    const keys = Object.keys(instanceSeenTags);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const tagUnion = {
        ...approvedSeenTags[attributeKey],
        ...instanceSeenTags[attributeKey]
      };
      approvedSeenTags[attributeKey] = tagUnion;
    }
    return approvedTags;
  }, []).reverse();
};
var getAnyTrueFromPropsList = (propsList, checkedTag) => {
  if (Array.isArray(propsList) && propsList.length) {
    for (let index = 0; index < propsList.length; index += 1) {
      const prop = propsList[index];
      if (prop[checkedTag]) {
        return true;
      }
    }
  }
  return false;
};
var reducePropsToState = (propsList) => ({
  baseTag: getBaseTagFromPropsList([
    "href"
    /* HREF */
  ], propsList),
  bodyAttributes: getAttributesFromPropsList("bodyAttributes", propsList),
  defer: getInnermostProperty(propsList, HELMET_PROPS.DEFER),
  encode: getInnermostProperty(propsList, HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),
  htmlAttributes: getAttributesFromPropsList("htmlAttributes", propsList),
  linkTags: getTagsFromPropsList(
    "link",
    [
      "rel",
      "href"
      /* HREF */
    ],
    propsList
  ),
  metaTags: getTagsFromPropsList(
    "meta",
    [
      "name",
      "charset",
      "http-equiv",
      "property",
      "itemprop"
      /* ITEM_PROP */
    ],
    propsList
  ),
  noscriptTags: getTagsFromPropsList("noscript", [
    "innerHTML"
    /* INNER_HTML */
  ], propsList),
  onChangeClientState: getOnChangeClientState(propsList),
  scriptTags: getTagsFromPropsList(
    "script",
    [
      "src",
      "innerHTML"
      /* INNER_HTML */
    ],
    propsList
  ),
  styleTags: getTagsFromPropsList("style", [
    "cssText"
    /* CSS_TEXT */
  ], propsList),
  title: getTitleFromPropsList(propsList),
  titleAttributes: getAttributesFromPropsList("titleAttributes", propsList),
  prioritizeSeoTags: getAnyTrueFromPropsList(propsList, HELMET_PROPS.PRIORITIZE_SEO_TAGS)
});
var flattenArray = (possibleArray) => Array.isArray(possibleArray) ? possibleArray.join("") : possibleArray;
var checkIfPropsMatch = (props, toMatch) => {
  const keys = Object.keys(props);
  for (let i = 0; i < keys.length; i += 1) {
    if (toMatch[keys[i]] && toMatch[keys[i]].includes(props[keys[i]])) {
      return true;
    }
  }
  return false;
};
var prioritizer = (elementsList, propsToMatch) => {
  if (Array.isArray(elementsList)) {
    return elementsList.reduce(
      (acc, elementAttrs) => {
        if (checkIfPropsMatch(elementAttrs, propsToMatch)) {
          acc.priority.push(elementAttrs);
        } else {
          acc.default.push(elementAttrs);
        }
        return acc;
      },
      { priority: [], default: [] }
    );
  }
  return { default: elementsList, priority: [] };
};
var without = (obj, key) => {
  return {
    ...obj,
    [key]: void 0
  };
};
var SELF_CLOSING_TAGS = [
  "noscript",
  "script",
  "style"
  /* STYLE */
];
var encodeSpecialCharacters = (str, encode = true) => {
  if (encode === false) {
    return String(str);
  }
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
};
var generateElementAttributesAsString = (attributes) => Object.keys(attributes).reduce((str, key) => {
  const attr = typeof attributes[key] !== "undefined" ? `${key}="${attributes[key]}"` : `${key}`;
  return str ? `${str} ${attr}` : attr;
}, "");
var generateTitleAsString = (type, title, attributes, encode) => {
  const attributeString = generateElementAttributesAsString(attributes);
  const flattenedTitle = flattenArray(title);
  return attributeString ? `<${type} ${HELMET_ATTRIBUTE}="true" ${attributeString}>${encodeSpecialCharacters(
    flattenedTitle,
    encode
  )}</${type}>` : `<${type} ${HELMET_ATTRIBUTE}="true">${encodeSpecialCharacters(
    flattenedTitle,
    encode
  )}</${type}>`;
};
var generateTagsAsString = (type, tags, encode = true) => tags.reduce((str, t) => {
  const tag = t;
  const attributeHtml = Object.keys(tag).filter(
    (attribute) => !(attribute === "innerHTML" || attribute === "cssText")
  ).reduce((string, attribute) => {
    const attr = typeof tag[attribute] === "undefined" ? attribute : `${attribute}="${encodeSpecialCharacters(tag[attribute], encode)}"`;
    return string ? `${string} ${attr}` : attr;
  }, "");
  const tagContent = tag.innerHTML || tag.cssText || "";
  const isSelfClosing = SELF_CLOSING_TAGS.indexOf(type) === -1;
  return `${str}<${type} ${HELMET_ATTRIBUTE}="true" ${attributeHtml}${isSelfClosing ? `/>` : `>${tagContent}</${type}>`}`;
}, "");
var convertElementAttributesToReactProps = (attributes, initProps = {}) => Object.keys(attributes).reduce((obj, key) => {
  const mapped = REACT_TAG_MAP[key];
  obj[mapped || key] = attributes[key];
  return obj;
}, initProps);
var generateTitleAsReactComponent = (_type, title, attributes) => {
  const initProps = {
    key: title,
    [HELMET_ATTRIBUTE]: true
  };
  const props = convertElementAttributesToReactProps(attributes, initProps);
  return [React3.createElement("title", props, title)];
};
var generateTagsAsReactComponent = (type, tags) => tags.map((tag, i) => {
  const mappedTag = {
    key: i,
    [HELMET_ATTRIBUTE]: true
  };
  Object.keys(tag).forEach((attribute) => {
    const mapped = REACT_TAG_MAP[attribute];
    const mappedAttribute = mapped || attribute;
    if (mappedAttribute === "innerHTML" || mappedAttribute === "cssText") {
      const content = tag.innerHTML || tag.cssText;
      mappedTag.dangerouslySetInnerHTML = { __html: content };
    } else {
      mappedTag[mappedAttribute] = tag[attribute];
    }
  });
  return React3.createElement(type, mappedTag);
});
var getMethodsForTag = (type, tags, encode = true) => {
  switch (type) {
    case "title":
      return {
        toComponent: () => generateTitleAsReactComponent(type, tags.title, tags.titleAttributes),
        toString: () => generateTitleAsString(type, tags.title, tags.titleAttributes, encode)
      };
    case "bodyAttributes":
    case "htmlAttributes":
      return {
        toComponent: () => convertElementAttributesToReactProps(tags),
        toString: () => generateElementAttributesAsString(tags)
      };
    default:
      return {
        toComponent: () => generateTagsAsReactComponent(type, tags),
        toString: () => generateTagsAsString(type, tags, encode)
      };
  }
};
var getPriorityMethods = ({ metaTags, linkTags, scriptTags, encode }) => {
  const meta = prioritizer(metaTags, SEO_PRIORITY_TAGS.meta);
  const link = prioritizer(linkTags, SEO_PRIORITY_TAGS.link);
  const script = prioritizer(scriptTags, SEO_PRIORITY_TAGS.script);
  const priorityMethods = {
    toComponent: () => [
      ...generateTagsAsReactComponent("meta", meta.priority),
      ...generateTagsAsReactComponent("link", link.priority),
      ...generateTagsAsReactComponent("script", script.priority)
    ],
    toString: () => (
      // generate all the tags as strings and concatenate them
      `${getMethodsForTag("meta", meta.priority, encode)} ${getMethodsForTag(
        "link",
        link.priority,
        encode
      )} ${getMethodsForTag("script", script.priority, encode)}`
    )
  };
  return {
    priorityMethods,
    metaTags: meta.default,
    linkTags: link.default,
    scriptTags: script.default
  };
};
var mapStateOnServer = (props) => {
  const {
    baseTag,
    bodyAttributes,
    encode = true,
    htmlAttributes,
    noscriptTags,
    styleTags,
    title = "",
    titleAttributes,
    prioritizeSeoTags
  } = props;
  let { linkTags, metaTags, scriptTags } = props;
  let priorityMethods = {
    toComponent: () => {
    },
    toString: () => ""
  };
  if (prioritizeSeoTags) {
    ({ priorityMethods, linkTags, metaTags, scriptTags } = getPriorityMethods(props));
  }
  return {
    priority: priorityMethods,
    base: getMethodsForTag("base", baseTag, encode),
    bodyAttributes: getMethodsForTag("bodyAttributes", bodyAttributes, encode),
    htmlAttributes: getMethodsForTag("htmlAttributes", htmlAttributes, encode),
    link: getMethodsForTag("link", linkTags, encode),
    meta: getMethodsForTag("meta", metaTags, encode),
    noscript: getMethodsForTag("noscript", noscriptTags, encode),
    script: getMethodsForTag("script", scriptTags, encode),
    style: getMethodsForTag("style", styleTags, encode),
    title: getMethodsForTag("title", { title, titleAttributes }, encode)
  };
};
var server_default = mapStateOnServer;
var instances = [];
var isDocument = !!(typeof window !== "undefined" && window.document && window.document.createElement);
var HelmetData = class {
  instances = [];
  canUseDOM = isDocument;
  context;
  value = {
    setHelmet: (serverState) => {
      this.context.helmet = serverState;
    },
    helmetInstances: {
      get: () => this.canUseDOM ? instances : this.instances,
      add: (instance) => {
        (this.canUseDOM ? instances : this.instances).push(instance);
      },
      remove: (instance) => {
        const index = (this.canUseDOM ? instances : this.instances).indexOf(instance);
        (this.canUseDOM ? instances : this.instances).splice(index, 1);
      }
    }
  };
  constructor(context, canUseDOM) {
    this.context = context;
    this.canUseDOM = canUseDOM || false;
    if (!canUseDOM) {
      context.helmet = server_default({
        baseTag: [],
        bodyAttributes: {},
        htmlAttributes: {},
        linkTags: [],
        metaTags: [],
        noscriptTags: [],
        scriptTags: [],
        styleTags: [],
        title: "",
        titleAttributes: {}
      });
    }
  }
};
var defaultValue = {};
var Context = React3.createContext(defaultValue);
var HelmetProvider = class _HelmetProvider extends Component {
  static canUseDOM = isDocument;
  helmetData;
  constructor(props) {
    super(props);
    this.helmetData = new HelmetData(this.props.context || {}, _HelmetProvider.canUseDOM);
  }
  render() {
    return /* @__PURE__ */ React3.createElement(Context.Provider, { value: this.helmetData.value }, this.props.children);
  }
};
var updateTags = (type, tags) => {
  const headElement = document.head || document.querySelector(
    "head"
    /* HEAD */
  );
  const tagNodes = headElement.querySelectorAll(`${type}[${HELMET_ATTRIBUTE}]`);
  const oldTags = [].slice.call(tagNodes);
  const newTags = [];
  let indexToDelete;
  if (tags && tags.length) {
    tags.forEach((tag) => {
      const newElement = document.createElement(type);
      for (const attribute in tag) {
        if (Object.prototype.hasOwnProperty.call(tag, attribute)) {
          if (attribute === "innerHTML") {
            newElement.innerHTML = tag.innerHTML;
          } else if (attribute === "cssText") {
            if (newElement.styleSheet) {
              newElement.styleSheet.cssText = tag.cssText;
            } else {
              newElement.appendChild(document.createTextNode(tag.cssText));
            }
          } else {
            const attr = attribute;
            const value = typeof tag[attr] === "undefined" ? "" : tag[attr];
            newElement.setAttribute(attribute, value);
          }
        }
      }
      newElement.setAttribute(HELMET_ATTRIBUTE, "true");
      if (oldTags.some((existingTag, index) => {
        indexToDelete = index;
        return newElement.isEqualNode(existingTag);
      })) {
        oldTags.splice(indexToDelete, 1);
      } else {
        newTags.push(newElement);
      }
    });
  }
  oldTags.forEach((tag) => tag.parentNode?.removeChild(tag));
  newTags.forEach((tag) => headElement.appendChild(tag));
  return {
    oldTags,
    newTags
  };
};
var updateAttributes = (tagName, attributes) => {
  const elementTag = document.getElementsByTagName(tagName)[0];
  if (!elementTag) {
    return;
  }
  const helmetAttributeString = elementTag.getAttribute(HELMET_ATTRIBUTE);
  const helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
  const attributesToRemove = [...helmetAttributes];
  const attributeKeys = Object.keys(attributes);
  for (const attribute of attributeKeys) {
    const value = attributes[attribute] || "";
    if (elementTag.getAttribute(attribute) !== value) {
      elementTag.setAttribute(attribute, value);
    }
    if (helmetAttributes.indexOf(attribute) === -1) {
      helmetAttributes.push(attribute);
    }
    const indexToSave = attributesToRemove.indexOf(attribute);
    if (indexToSave !== -1) {
      attributesToRemove.splice(indexToSave, 1);
    }
  }
  for (let i = attributesToRemove.length - 1; i >= 0; i -= 1) {
    elementTag.removeAttribute(attributesToRemove[i]);
  }
  if (helmetAttributes.length === attributesToRemove.length) {
    elementTag.removeAttribute(HELMET_ATTRIBUTE);
  } else if (elementTag.getAttribute(HELMET_ATTRIBUTE) !== attributeKeys.join(",")) {
    elementTag.setAttribute(HELMET_ATTRIBUTE, attributeKeys.join(","));
  }
};
var updateTitle = (title, attributes) => {
  if (typeof title !== "undefined" && document.title !== title) {
    document.title = flattenArray(title);
  }
  updateAttributes("title", attributes);
};
var commitTagChanges = (newState, cb) => {
  const {
    baseTag,
    bodyAttributes,
    htmlAttributes,
    linkTags,
    metaTags,
    noscriptTags,
    onChangeClientState,
    scriptTags,
    styleTags,
    title,
    titleAttributes
  } = newState;
  updateAttributes("body", bodyAttributes);
  updateAttributes("html", htmlAttributes);
  updateTitle(title, titleAttributes);
  const tagUpdates = {
    baseTag: updateTags("base", baseTag),
    linkTags: updateTags("link", linkTags),
    metaTags: updateTags("meta", metaTags),
    noscriptTags: updateTags("noscript", noscriptTags),
    scriptTags: updateTags("script", scriptTags),
    styleTags: updateTags("style", styleTags)
  };
  const addedTags = {};
  const removedTags = {};
  Object.keys(tagUpdates).forEach((tagType) => {
    const { newTags, oldTags } = tagUpdates[tagType];
    if (newTags.length) {
      addedTags[tagType] = newTags;
    }
    if (oldTags.length) {
      removedTags[tagType] = tagUpdates[tagType].oldTags;
    }
  });
  if (cb) {
    cb();
  }
  onChangeClientState(newState, addedTags, removedTags);
};
var _helmetCallback = null;
var handleStateChangeOnClient = (newState) => {
  if (_helmetCallback) {
    cancelAnimationFrame(_helmetCallback);
  }
  if (newState.defer) {
    _helmetCallback = requestAnimationFrame(() => {
      commitTagChanges(newState, () => {
        _helmetCallback = null;
      });
    });
  } else {
    commitTagChanges(newState);
    _helmetCallback = null;
  }
};
var client_default = handleStateChangeOnClient;
var HelmetDispatcher = class extends Component {
  rendered = false;
  shouldComponentUpdate(nextProps) {
    return !shallowEqual(nextProps, this.props);
  }
  componentDidUpdate() {
    this.emitChange();
  }
  componentWillUnmount() {
    const { helmetInstances } = this.props.context;
    helmetInstances.remove(this);
    this.emitChange();
  }
  emitChange() {
    const { helmetInstances, setHelmet } = this.props.context;
    let serverState = null;
    const state = reducePropsToState(
      helmetInstances.get().map((instance) => {
        const props = { ...instance.props };
        delete props.context;
        return props;
      })
    );
    if (HelmetProvider.canUseDOM) {
      client_default(state);
    } else if (server_default) {
      serverState = server_default(state);
    }
    setHelmet(serverState);
  }
  // componentWillMount will be deprecated
  // for SSR, initialize on first render
  // constructor is also unsafe in StrictMode
  init() {
    if (this.rendered) {
      return;
    }
    this.rendered = true;
    const { helmetInstances } = this.props.context;
    helmetInstances.add(this);
    this.emitChange();
  }
  render() {
    this.init();
    return null;
  }
};
var Helmet = class extends Component {
  static defaultProps = {
    defer: true,
    encodeSpecialCharacters: true,
    prioritizeSeoTags: false
  };
  shouldComponentUpdate(nextProps) {
    return !fastCompare(without(this.props, "helmetData"), without(nextProps, "helmetData"));
  }
  mapNestedChildrenToProps(child, nestedChildren) {
    if (!nestedChildren) {
      return null;
    }
    switch (child.type) {
      case "script":
      case "noscript":
        return {
          innerHTML: nestedChildren
        };
      case "style":
        return {
          cssText: nestedChildren
        };
      default:
        throw new Error(
          `<${child.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`
        );
    }
  }
  flattenArrayTypeChildren(child, arrayTypeChildren, newChildProps, nestedChildren) {
    return {
      ...arrayTypeChildren,
      [child.type]: [
        ...arrayTypeChildren[child.type] || [],
        {
          ...newChildProps,
          ...this.mapNestedChildrenToProps(child, nestedChildren)
        }
      ]
    };
  }
  mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren) {
    switch (child.type) {
      case "title":
        return {
          ...newProps,
          [child.type]: nestedChildren,
          titleAttributes: { ...newChildProps }
        };
      case "body":
        return {
          ...newProps,
          bodyAttributes: { ...newChildProps }
        };
      case "html":
        return {
          ...newProps,
          htmlAttributes: { ...newChildProps }
        };
      default:
        return {
          ...newProps,
          [child.type]: { ...newChildProps }
        };
    }
  }
  mapArrayTypeChildrenToProps(arrayTypeChildren, newProps) {
    let newFlattenedProps = { ...newProps };
    Object.keys(arrayTypeChildren).forEach((arrayChildName) => {
      newFlattenedProps = {
        ...newFlattenedProps,
        [arrayChildName]: arrayTypeChildren[arrayChildName]
      };
    });
    return newFlattenedProps;
  }
  warnOnInvalidChildren(child, nestedChildren) {
    invariant(
      VALID_TAG_NAMES.some((name) => child.type === name),
      typeof child.type === "function" ? `You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.` : `Only elements types ${VALID_TAG_NAMES.join(
        ", "
      )} are allowed. Helmet does not support rendering <${child.type}> elements. Refer to our API for more information.`
    );
    invariant(
      !nestedChildren || typeof nestedChildren === "string" || Array.isArray(nestedChildren) && !nestedChildren.some((nestedChild) => typeof nestedChild !== "string"),
      `Helmet expects a string as a child of <${child.type}>. Did you forget to wrap your children in braces? ( <${child.type}>{\`\`}</${child.type}> ) Refer to our API for more information.`
    );
    return true;
  }
  mapChildrenToProps(children, newProps) {
    let arrayTypeChildren = {};
    React3.Children.forEach(children, (child) => {
      if (!child || !child.props) {
        return;
      }
      const { children: nestedChildren, ...childProps } = child.props;
      const newChildProps = Object.keys(childProps).reduce((obj, key) => {
        obj[HTML_TAG_MAP[key] || key] = childProps[key];
        return obj;
      }, {});
      let { type } = child;
      if (typeof type === "symbol") {
        type = type.toString();
      } else {
        this.warnOnInvalidChildren(child, nestedChildren);
      }
      switch (type) {
        case "Symbol(react.fragment)":
          newProps = this.mapChildrenToProps(nestedChildren, newProps);
          break;
        case "link":
        case "meta":
        case "noscript":
        case "script":
        case "style":
          arrayTypeChildren = this.flattenArrayTypeChildren(
            child,
            arrayTypeChildren,
            newChildProps,
            nestedChildren
          );
          break;
        default:
          newProps = this.mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren);
          break;
      }
    });
    return this.mapArrayTypeChildrenToProps(arrayTypeChildren, newProps);
  }
  render() {
    const { children, ...props } = this.props;
    let newProps = { ...props };
    let { helmetData } = props;
    if (children) {
      newProps = this.mapChildrenToProps(children, newProps);
    }
    if (helmetData && !(helmetData instanceof HelmetData)) {
      const data = helmetData;
      helmetData = new HelmetData(data.context, true);
      delete newProps.helmetData;
    }
    return helmetData ? /* @__PURE__ */ React3.createElement(HelmetDispatcher, { ...newProps, context: helmetData.value }) : /* @__PURE__ */ React3.createElement(Context.Consumer, null, (context) => /* @__PURE__ */ React3.createElement(HelmetDispatcher, { ...newProps, context }));
  }
};
const SEO = ({
  title = "ProdSpark - Discover Elite Tools & Products 2026",
  description = "Connect with the world's most innovative tools and creators. ProdSpark is the premium directory for AI, DevTools, and more.",
  image = "https://prodspark.com/og-image.png",
  // Replace with real OG image
  url = "https://prodspark.com",
  type = "website",
  keywords = "ai, devtools, marketing, productivity, directory, makers, saas",
  author = "ProdSpark Team",
  canonical
}) => {
  const siteName = "ProdSpark";
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  return /* @__PURE__ */ jsxs(Helmet, { children: [
    /* @__PURE__ */ jsx("title", { children: fullTitle }),
    /* @__PURE__ */ jsx("meta", { name: "description", content: description }),
    /* @__PURE__ */ jsx("meta", { name: "keywords", content: keywords }),
    /* @__PURE__ */ jsx("meta", { name: "author", content: author }),
    canonical && /* @__PURE__ */ jsx("link", { rel: "canonical", href: canonical }),
    /* @__PURE__ */ jsx("meta", { property: "og:type", content: type }),
    /* @__PURE__ */ jsx("meta", { property: "og:url", content: url }),
    /* @__PURE__ */ jsx("meta", { property: "og:title", content: fullTitle }),
    /* @__PURE__ */ jsx("meta", { property: "og:description", content: description }),
    /* @__PURE__ */ jsx("meta", { property: "og:image", content: image }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:url", content: url }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: fullTitle }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: description }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: image }),
    /* @__PURE__ */ jsx("meta", { name: "theme-color", content: "#f97316" }),
    /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=5" })
  ] });
};
const SchemaOrg = ({ data }) => {
  return /* @__PURE__ */ jsx(Helmet, { children: /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(data) }) });
};
const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchFeatured = async () => {
      const { data: products, error } = await supabase.from("products").select("*").limit(10);
      if (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
        return;
      }
      const { data: reviews } = await supabase.from("reviews").select("product_id, stars");
      const productsWithScores = (products || []).map((p) => {
        const productReviews = reviews?.filter((r) => r.product_id === p.id) || [];
        const avgRating = productReviews.length > 0 ? productReviews.reduce((acc, curr) => acc + curr.stars, 0) / productReviews.length : 0;
        return {
          ...p,
          quality_score: calculateQualityScore(p, avgRating),
          averageRating: avgRating
        };
      });
      const top4 = productsWithScores.sort((a, b) => (b.quality_score || 0) - (a.quality_score || 0)).slice(0, 4);
      setFeaturedProducts(top4);
      setLoading(false);
    };
    fetchFeatured();
  }, []);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };
  const features = [
    {
      icon: /* @__PURE__ */ jsx(ShieldCheck, { className: "text-primary" }),
      title: "Verified Curation",
      desc: "Every product is manually vetted for quality, innovation, and reliability."
    },
    {
      icon: /* @__PURE__ */ jsx(Cpu, { className: "text-blue-500" }),
      title: "Intelligence First",
      desc: "Proprietary quality scores based on real-world utility and user feedback."
    },
    {
      icon: /* @__PURE__ */ jsx(Globe, { className: "text-green-500" }),
      title: "Global Reach",
      desc: "Connect with creators and products from every corner of the digital world."
    }
  ];
  const stats = [
    { label: "Elite Tools", value: "2.5k+" },
    { label: "Active Makers", value: "12k+" },
    { label: "Reviews Shared", value: "45k+" },
    { label: "Sparks Ignited", value: "1.2M" }
  ];
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ProdSpark",
    "url": "https://prodspark.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://prodspark.com/products?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ProdSpark",
    "url": "https://prodspark.com",
    "logo": "https://prodspark.com/logo-icon.png",
    "sameAs": [
      "https://twitter.com/prodspark",
      "https://github.com/prodspark"
    ]
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col min-h-screen", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "ProdSpark - Discover Elite Tools & Products 2026",
        description: "Ignite your innovation with the best free and premium AI tools, devtools, and productivity software. Join 12k+ makers shaping the future."
      }
    ),
    /* @__PURE__ */ jsx(SchemaOrg, { data: websiteSchema }),
    /* @__PURE__ */ jsx(SchemaOrg, { data: organizationSchema }),
    /* @__PURE__ */ jsxs("section", { className: "relative pt-32 pb-40 overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            animate: {
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              x: [-100, 100, -100]
            },
            transition: { duration: 20, repeat: Infinity, ease: "linear" },
            className: "absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-100/40 dark:bg-orange-500/10 rounded-full blur-[100px]"
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            animate: {
              scale: [1.2, 1, 1.2],
              rotate: [0, -90, 0],
              x: [100, -100, 100]
            },
            transition: { duration: 25, repeat: Infinity, ease: "linear" },
            className: "absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-100/40 dark:bg-indigo-500/10 rounded-full blur-[100px]"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.9 },
            animate: { opacity: 1, scale: 1 },
            className: "inline-flex items-center gap-2 bg-orange-50 dark:bg-orange-500/10 text-primary border border-orange-100 dark:border-orange-500/20 px-5 py-2 rounded-full text-sm font-black mb-10 shadow-sm",
            children: [
              /* @__PURE__ */ jsx(Sparkles, { size: 16, fill: "currentColor" }),
              /* @__PURE__ */ jsx("span", { className: "uppercase tracking-widest text-[11px]", children: "Next Generation Directory" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.h1,
          {
            initial: { opacity: 0, y: 30 },
            animate: { opacity: 1, y: 0 },
            className: "text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[0.95]",
            children: [
              "Spark Your Ideas – ",
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent", children: "Discover Excellence." })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          motion.p,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.1 },
            className: "max-w-2xl mx-auto text-xl text-slate-500 dark:text-slate-400 mb-14 leading-relaxed font-medium",
            children: "ProdSpark is where world-class creators showcase their tools. Join the elite community of makers shaping the future."
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.2 },
            className: "flex flex-col sm:flex-row items-center justify-center gap-6",
            children: [
              /* @__PURE__ */ jsxs(Link, { to: "/products", className: "btn-primary flex items-center gap-3 group relative overflow-hidden", children: [
                /* @__PURE__ */ jsxs("span", { className: "relative z-10 flex items-center gap-3", children: [
                  "Explore The Catalog",
                  /* @__PURE__ */ jsx(ChevronRight, { size: 20, className: "group-hover:translate-x-1 transition-transform" })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity" })
              ] }),
              /* @__PURE__ */ jsxs(Link, { to: "/submit", className: "btn-secondary flex items-center gap-3 group", children: [
                "Submit Your Product",
                /* @__PURE__ */ jsx(Zap, { size: 20, className: "text-primary group-hover:scale-110 transition-transform" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "mt-24 grid grid-cols-2 md:grid-cols-4 gap-8", children: stats.map((stat, i) => /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            transition: { delay: i * 0.1 },
            className: "text-center",
            children: [
              /* @__PURE__ */ jsx("div", { className: "text-3xl md:text-4xl font-black text-main mb-1", children: stat.value }),
              /* @__PURE__ */ jsx("div", { className: "text-xs font-black uppercase tracking-widest text-slate-400", children: stat.label })
            ]
          },
          stat.label
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-32 border-y border-main relative overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-20", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl md:text-5xl font-black mb-6", children: "Built for Creators" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 font-medium max-w-xl mx-auto text-lg", children: "We don't just list products. We ignite conversations and validate innovation through a rigorous platform built for the elite." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-12", children: features.map((feature, i) => /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          transition: { delay: i * 0.1 },
          className: "bg-card border border-main p-10 rounded-[2.5rem] shadow-sm hover:shadow-premium transition-all group",
          children: [
            /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center mb-8 border border-main group-hover:scale-110 transition-transform", children: feature.icon }),
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-black mb-4", children: feature.title }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 font-medium leading-relaxed", children: feature.desc })
          ]
        },
        feature.title
      )) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-32 bg-slate-50 dark:bg-slate-900/50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center md:items-end mb-16 text-center md:text-left gap-8", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center md:justify-start gap-2 text-primary font-bold mb-2", children: [
            /* @__PURE__ */ jsx(TrendingUp, { size: 20 }),
            /* @__PURE__ */ jsx("span", { className: "uppercase tracking-widest text-xs", children: "Premium tools" })
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "text-4xl md:text-5xl font-black", children: "Featured Products" })
        ] }),
        /* @__PURE__ */ jsxs(Link, { to: "/products", className: "btn-secondary py-3 px-8 text-sm flex items-center gap-2", children: [
          "View Full Directory ",
          /* @__PURE__ */ jsx(ArrowRight, { size: 16 })
        ] })
      ] }),
      loading ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsx("div", { className: "bg-card rounded-[2rem] h-[400px] animate-pulse border border-main" }, i)) }) : featuredProducts.length > 0 ? /* @__PURE__ */ jsx(
        motion.div,
        {
          variants: containerVariants,
          initial: "hidden",
          whileInView: "visible",
          viewport: { once: true },
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8",
          children: featuredProducts.map((p) => /* @__PURE__ */ jsx(motion.div, { variants: itemVariants, children: /* @__PURE__ */ jsx(ProductCard, { product: p, averageRating: p.averageRating || 0 }) }, p.id))
        }
      ) : /* @__PURE__ */ jsxs("div", { className: "text-center py-24 bg-card rounded-[3rem] border border-dashed border-main", children: [
        /* @__PURE__ */ jsx("p", { className: "text-slate-400 font-bold text-xl uppercase tracking-widest", children: "No sparks found yet." }),
        /* @__PURE__ */ jsx(Link, { to: "/submit", className: "text-primary font-black mt-4 block hover:underline", children: "Submit yours now" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-32 overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-24 items-center", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -50 },
          whileInView: { opacity: 1, x: 0 },
          children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-5xl font-black mb-8 leading-tight", children: [
              "Elevate Your Product to ",
              /* @__PURE__ */ jsx("span", { className: "text-primary italic", children: "Elite Status." })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "space-y-8", children: [
              { icon: /* @__PURE__ */ jsx(Layers, { size: 21 }), title: "Quality Assurance", desc: "We review every submission for UX, performance, and actual utility." },
              { icon: /* @__PURE__ */ jsx(BarChart3, { size: 21 }), title: "Data Driven Insight", desc: "Interactive analytics and engagement metrics for every product listed." },
              { icon: /* @__PURE__ */ jsx(Users, { size: 21 }), title: "Maker Community", desc: "Direct feedback from the industry's most respected creators." }
            ].map((item, i) => /* @__PURE__ */ jsxs("div", { className: "flex gap-6 group", children: [
              /* @__PURE__ */ jsx("div", { className: "w-14 h-14 shrink-0 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-primary border border-main group-hover:border-primary/40 transition-colors", children: item.icon }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h4", { className: "text-xl font-black mb-2", children: item.title }),
                /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 font-medium", children: item.desc })
              ] })
            ] }, i)) })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.8 },
          whileInView: { opacity: 1, scale: 1 },
          className: "relative",
          children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-primary/20 blur-[120px] rounded-full" }),
            /* @__PURE__ */ jsx("div", { className: "relative bg-card border-4 border-main rounded-[3rem] p-12 shadow-3xl", children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsx("div", { className: "h-4 w-1/3 bg-slate-100 dark:bg-slate-800 rounded-full" }),
              /* @__PURE__ */ jsx("div", { className: "h-20 w-full bg-slate-100 dark:bg-slate-800 rounded-3xl" }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-6", children: [
                /* @__PURE__ */ jsx("div", { className: "h-32 bg-orange-500/10 rounded-3xl border border-orange-500/20" }),
                /* @__PURE__ */ jsx("div", { className: "h-32 bg-indigo-500/10 rounded-3xl border border-indigo-500/20" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "h-4 w-2/3 bg-slate-100 dark:bg-slate-800 rounded-full" }),
              /* @__PURE__ */ jsx("div", { className: "h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full" })
            ] }) })
          ]
        }
      )
    ] }) }) })
  ] });
};
const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [pricingFilter, setPricingFilter] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    setLoading(true);
    const { data: productsData, error } = await supabase.from("products").select("*");
    if (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
      return;
    }
    const { data: reviews } = await supabase.from("reviews").select("product_id, stars");
    const productsWithScores = (productsData || []).map((p) => {
      const productReviews = reviews?.filter((r) => r.product_id === p.id) || [];
      const avgRating = productReviews.length > 0 ? productReviews.reduce((acc, curr) => acc + curr.stars, 0) / productReviews.length : 0;
      return {
        ...p,
        quality_score: calculateQualityScore(p, avgRating),
        averageRating: avgRating
      };
    });
    const sorted = productsWithScores.sort((a, b) => (b.quality_score || 0) - (a.quality_score || 0));
    setProducts(sorted);
    setLoading(false);
  };
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase()) || p.category.toLowerCase().includes(searchTerm.toLowerCase()) || p.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesPricing = pricingFilter === "All" || p.pricing === pricingFilter;
    return matchesSearch && matchesPricing;
  });
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": filteredProducts.map((p, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "url": `https://prodspark.com/products/${p.id}`,
      "name": p.name
    }))
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen pt-12 pb-24", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Elite Tools Directory - Browse Innovative Products",
        description: "Explore our curated collection of elite AI tools, devtools, and productivity apps. Filter by pricing and category to find your next digital spark.",
        canonical: "https://prodspark.com/products"
      }
    ),
    /* @__PURE__ */ jsx(SchemaOrg, { data: itemListSchema }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col mb-16 space-y-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center md:text-left", children: [
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -20 },
              animate: { opacity: 1, x: 0 },
              className: "flex items-center justify-center md:justify-start gap-2 text-primary font-black uppercase tracking-widest text-xs mb-4",
              children: [
                /* @__PURE__ */ jsx(Zap, { size: 16, fill: "currentColor" }),
                /* @__PURE__ */ jsx("span", { children: "Curation of Excellence" })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            motion.h1,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              className: "text-5xl md:text-6xl font-black text-main tracking-tighter",
              children: "Browse The Spark"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-6 items-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative flex-grow w-full", children: [
            /* @__PURE__ */ jsx(Search, { className: "absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors", size: 22 }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                placeholder: "Search by name, category, or tags...",
                className: "w-full pl-14 pr-6 py-5 bg-card border-2 border-main rounded-[2rem] focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all shadow-sm font-medium",
                value: searchTerm,
                onChange: (e) => setSearchTerm(e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative w-full lg:w-64", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => setIsDropdownOpen(!isDropdownOpen),
                className: "w-full flex items-center justify-between px-8 py-5 bg-card border-2 border-main rounded-[2rem] shadow-sm hover:border-primary/20 transition-all font-black uppercase tracking-widest text-xs",
                children: [
                  /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsx(SlidersHorizontal, { size: 18, className: "text-primary" }),
                    pricingFilter === "All" ? "Pricing Strategy" : pricingFilter
                  ] }),
                  /* @__PURE__ */ jsx(
                    motion.div,
                    {
                      animate: { rotate: isDropdownOpen ? 180 : 0 },
                      transition: { duration: 0.2 },
                      children: /* @__PURE__ */ jsx(ChevronDown, { size: 18 })
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsx(AnimatePresence, { children: isDropdownOpen && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "fixed inset-0 z-10",
                  onClick: () => setIsDropdownOpen(false)
                }
              ),
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { opacity: 0, y: 10, scale: 0.95 },
                  animate: { opacity: 1, y: 0, scale: 1 },
                  exit: { opacity: 0, y: 10, scale: 0.95 },
                  className: "absolute top-full left-0 right-0 mt-3 z-20 bg-white dark:bg-slate-950 border-2 border-main rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden p-2",
                  children: ["All", "Free", "Premium", "Paid"].map((type) => /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => {
                        setPricingFilter(type);
                        setIsDropdownOpen(false);
                      },
                      className: `w-full text-left px-6 py-4 rounded-2xl text-[11px] font-black tracking-[0.2em] uppercase transition-all ${pricingFilter === type ? "bg-primary text-white" : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 hover:text-main"}`,
                      children: type
                    },
                    type
                  ))
                }
              )
            ] }) })
          ] })
        ] })
      ] }),
      loading ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10", children: [1, 2, 3, 4, 5, 6, 7, 8].map((i) => /* @__PURE__ */ jsx("div", { className: "bg-card rounded-[2rem] h-[450px] animate-pulse border-2 border-main" }, i)) }) : /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: /* @__PURE__ */ jsx(
        motion.div,
        {
          layout: true,
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10",
          children: filteredProducts.length > 0 ? filteredProducts.map((p) => /* @__PURE__ */ jsx(
            motion.div,
            {
              layout: true,
              initial: { opacity: 0, scale: 0.9 },
              animate: { opacity: 1, scale: 1 },
              exit: { opacity: 0, scale: 0.9 },
              transition: { duration: 0.3 },
              children: /* @__PURE__ */ jsx(ProductCard, { product: p, averageRating: p.averageRating || 0 })
            },
            p.id
          )) : /* @__PURE__ */ jsxs("div", { className: "col-span-full py-40 flex flex-col items-center", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-card w-24 h-24 rounded-[2rem] flex items-center justify-center shadow-sm border border-main mb-8", children: /* @__PURE__ */ jsx(SlidersHorizontal, { className: "text-slate-300 dark:text-slate-700", size: 40 }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-black mb-2", children: "No tools match your spark" }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-400 font-medium", children: "Try broadening your search or switching filters." }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => {
                  setSearchTerm("");
                  setPricingFilter("All");
                },
                className: "mt-8 text-primary font-black uppercase tracking-widest text-xs hover:underline",
                children: "Reset Filters"
              }
            )
          ] })
        }
      ) })
    ] })
  ] });
};
const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useUser();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [newReview, setNewReview] = useState({ text: "", stars: 5 });
  useEffect(() => {
    if (id) {
      fetchProductAndReviews();
      incrementViews();
    }
  }, [id]);
  const fetchProductAndReviews = async () => {
    const { data: productData } = await supabase.from("products").select("*").eq("id", id).single();
    const { data: reviewsData } = await supabase.from("reviews").select("*").eq("product_id", id).order("created_at", { ascending: false });
    if (productData) {
      const avgRating2 = reviewsData && reviewsData.length > 0 ? reviewsData.reduce((acc, curr) => acc + curr.stars, 0) / reviewsData.length : 0;
      setProduct({
        ...productData,
        quality_score: calculateQualityScore(productData, avgRating2)
      });
      setReviews(reviewsData || []);
    }
    setLoading(false);
  };
  const incrementViews = async () => {
    const sessionKey = `viewed_${id}`;
    if (!sessionStorage.getItem(sessionKey)) {
      await supabase.rpc("increment_views", { product_id: id });
      sessionStorage.setItem(sessionKey, "true");
    }
  };
  const handleLike = async () => {
    if (!user) {
      toast.error("Sign in to like this product");
      return;
    }
    const isLiked = product?.likes.includes(user.id);
    const newLikes = isLiked ? product?.likes.filter((uid) => uid !== user.id) : [...product?.likes || [], user.id];
    const { error } = await supabase.from("products").update({ likes: newLikes }).eq("id", id);
    if (!error && product) {
      setProduct({ ...product, likes: newLikes || [] });
      toast.success(isLiked ? "Removed from favorites" : "Added to favorites!");
    }
  };
  const submitReview = async (e) => {
    e.preventDefault();
    if (!user) return;
    if (!newReview.text.trim()) return;
    setReviewLoading(true);
    const { data, error } = await supabase.from("reviews").insert({
      product_id: id,
      user_clerk_id: user.id,
      text: newReview.text,
      stars: newReview.stars
    }).select().single();
    if (error) {
      toast.error("Failed to post review");
    } else {
      setReviews([data, ...reviews]);
      setNewReview({ text: "", stars: 5 });
      toast.success("Review shared with the community!");
      fetchProductAndReviews();
    }
    setReviewLoading(false);
  };
  if (loading) {
    return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center min-h-[80vh]", children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          animate: { scale: [1, 1.2, 1], rotate: [0, 360] },
          transition: { repeat: Infinity, duration: 2 },
          children: /* @__PURE__ */ jsx(Loader2, { className: "text-primary mb-6", size: 60 })
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "text-slate-400 font-black tracking-[0.3em] uppercase text-sm", children: "Igniting the Spark" })
    ] });
  }
  if (!product) {
    return /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 py-40 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-4xl font-black mb-6", children: "Tool Disappeared!" }),
      /* @__PURE__ */ jsx(Link, { to: "/products", className: "btn-primary inline-flex", children: "Back to directory" })
    ] });
  }
  const avgRating = reviews.length > 0 ? reviews.reduce((acc, curr) => acc + curr.stars, 0) / reviews.length : 0;
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.logo_url,
    "brand": {
      "@type": "Brand",
      "name": product.name
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": product.link
    },
    ...reviews.length > 0 ? {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": avgRating.toFixed(1),
        "reviewCount": reviews.length
      }
    } : {}
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: `${product.name} - ${product.category || "Elite Tool"} Review & Details`,
        description: product.description.substring(0, 160),
        image: product.logo_url,
        url: `https://prodspark.com/products/${id}`,
        type: "product"
      }
    ),
    /* @__PURE__ */ jsx(SchemaOrg, { data: productSchema }),
    /* @__PURE__ */ jsxs("div", { className: "bg-slate-50 dark:bg-slate-900 border-b border-main relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-500/5 to-transparent pointer-events-none" }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10", children: [
        /* @__PURE__ */ jsxs(Link, { to: "/products", className: "inline-flex items-center gap-2 text-slate-400 hover:text-main mb-12 transition-colors font-bold uppercase tracking-widest text-xs", children: [
          /* @__PURE__ */ jsx(ArrowLeft, { size: 18 }),
          "Back to Catalog"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-12 items-start", children: [
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.9 },
              animate: { opacity: 1, scale: 1 },
              className: "relative",
              children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: `${product.logo_url}?q_auto,f_auto,w_400`,
                    alt: product.name,
                    loading: "eager",
                    className: "w-40 h-40 rounded-[2.5rem] object-cover shadow-2xl border-4 border-card"
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "absolute -bottom-3 -right-3 bg-secondary text-white p-3 rounded-2xl shadow-xl", children: /* @__PURE__ */ jsx(Zap, { size: 20, fill: "currentColor", className: "text-orange-400" }) })
              ]
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "flex-grow", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
                /* @__PURE__ */ jsx("h1", { className: "text-5xl md:text-6xl font-black leading-none", children: product.name }),
                /* @__PURE__ */ jsxs("span", { className: "bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border border-primary/20 flex items-center gap-1.5 self-end mb-1", children: [
                  /* @__PURE__ */ jsx(Layers, { size: 12 }),
                  product.category || "General"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 bg-card px-4 py-2 rounded-full border border-main shadow-sm", children: [
                  /* @__PURE__ */ jsx(StarRating, { rating: Math.round(avgRating) }),
                  /* @__PURE__ */ jsx("span", { className: "font-black", children: avgRating.toFixed(1) }),
                  /* @__PURE__ */ jsxs("span", { className: "text-slate-400 text-xs font-bold uppercase ml-1", children: [
                    "(",
                    reviews.length,
                    ")"
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "h-4 w-px bg-slate-200 dark:bg-slate-800" }),
                /* @__PURE__ */ jsx("span", { className: `px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-sm ${product.pricing === "Free" ? "bg-green-500 text-white" : product.pricing === "Premium" ? "bg-orange-500 text-white" : "bg-indigo-600 text-white"}`, children: product.pricing })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxs(
                motion.button,
                {
                  whileTap: { scale: 0.9 },
                  onClick: handleLike,
                  className: `flex items-center gap-2 px-8 py-4 rounded-2xl font-black transition-all border-2 ${product.likes.includes(user?.id || "") ? "bg-red-50 dark:bg-red-500/10 border-red-100 dark:border-red-500/20 text-red-500 shadow-lg shadow-red-100 dark:shadow-none" : "bg-card border-main text-slate-400 hover:border-red-100 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10"}`,
                  children: [
                    /* @__PURE__ */ jsx(Heart, { size: 24, className: product.likes.includes(user?.id || "") ? "fill-current" : "" }),
                    product.likes.length
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "a",
                {
                  href: product.link,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "btn-primary",
                  children: [
                    "Visit Experience",
                    /* @__PURE__ */ jsx(ExternalLink, { size: 20 })
                  ]
                }
              )
            ] })
          ] }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid grid-cols-1 lg:grid-cols-3 gap-24 font-sans text-main", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-20", children: [
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-secondary dark:bg-slate-800 rounded-xl flex items-center justify-center text-white", children: /* @__PURE__ */ jsx(Info, { size: 24 }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black", children: "Discovery Journey" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium whitespace-pre-wrap", children: product.description })
        ] }),
        (product.images_urls || []).length > 0 && /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black mb-10", children: "Visual Preview" }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: product.images_urls.map((url, i) => /* @__PURE__ */ jsx(
            motion.img,
            {
              whileHover: { scale: 1.02 },
              src: `${url}?q_auto,f_auto,w_800`,
              alt: `Preview ${i}`,
              loading: "lazy",
              className: "rounded-[2.5rem] w-full aspect-video object-cover border-4 border-main shadow-xl"
            },
            url
          )) })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-black text-slate-300 dark:text-slate-700 text-xs uppercase tracking-[0.3em] mb-6", children: "Classified Under" }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3", children: (product.tags || []).map((tag) => /* @__PURE__ */ jsxs("span", { className: "bg-card px-6 py-3 rounded-2xl text-sm font-black border-2 border-main shadow-sm hover:border-primary/20 transition-colors", children: [
            "#",
            tag.toUpperCase()
          ] }, tag)) })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "pt-24 border-t border-main", children: [
          /* @__PURE__ */ jsx("div", { className: "flex justify-between items-center mb-12", children: /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-black flex items-center gap-4", children: [
            /* @__PURE__ */ jsx(MessageSquare, { className: "text-primary", size: 32 }),
            "Community Intel"
          ] }) }),
          user ? /* @__PURE__ */ jsxs("form", { onSubmit: submitReview, className: "bg-slate-50 dark:bg-slate-900 rounded-[3rem] p-10 mb-20 border-2 border-main shadow-inner", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6 mb-8", children: [
              /* @__PURE__ */ jsx("span", { className: "font-black text-lg", children: "Rate Your Intel:" }),
              /* @__PURE__ */ jsx(
                StarRating,
                {
                  rating: newReview.stars,
                  interactive: true,
                  onRatingChange: (s) => setNewReview({ ...newReview, stars: s }),
                  size: 32
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                required: true,
                rows: 4,
                placeholder: "Share your experience with the community...",
                className: "w-full px-8 py-6 bg-card border-2 border-main rounded-[2.5rem] focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all resize-none mb-6 font-medium text-lg lg:text-xl shadow-sm",
                value: newReview.text,
                onChange: (e) => setNewReview({ ...newReview, text: e.target.value })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                disabled: reviewLoading,
                type: "submit",
                className: "btn-primary w-full md:w-auto",
                children: reviewLoading ? "Transmitting..." : "Post Your Intel"
              }
            )
          ] }) : /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-[3rem] p-16 text-center mb-20 border-4 border-dashed border-main", children: [
            /* @__PURE__ */ jsx("p", { className: "text-slate-500 font-black text-xl mb-6 uppercase tracking-widest", children: "Signed In Intelligence Required" }),
            /* @__PURE__ */ jsx(Link, { to: "/sign-in", className: "btn-primary", children: "Connect Now" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-12", children: reviews.length > 0 ? reviews.map((review) => /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0 },
              whileInView: { opacity: 1 },
              className: "pb-12 border-b border-main group",
              children: [
                /* @__PURE__ */ jsx("div", { className: "flex justify-between items-start mb-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-2xl bg-secondary dark:bg-slate-800 flex items-center justify-center text-primary font-black text-xl shadow-lg", children: review.user_clerk_id.substring(0, 2).toUpperCase() }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(StarRating, { rating: review.stars, size: 16 }),
                    /* @__PURE__ */ jsxs("p", { className: "text-[11px] text-slate-400 font-black uppercase tracking-[0.2em] mt-2", children: [
                      "User ID: ",
                      review.user_clerk_id.substring(0, 8),
                      " • ",
                      new Date(review.created_at).toLocaleDateString()
                    ] })
                  ] })
                ] }) }),
                /* @__PURE__ */ jsxs("p", { className: "text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium italic pl-4 border-l-4 border-main group-hover:border-primary transition-colors", children: [
                  '"',
                  review.text,
                  '"'
                ] })
              ]
            },
            review.id
          )) : /* @__PURE__ */ jsx("div", { className: "text-center py-20 bg-slate-50 dark:bg-slate-900 rounded-[3rem]", children: /* @__PURE__ */ jsx("p", { className: "text-slate-400 font-black uppercase tracking-widest", children: "No community data yet" }) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsxs("div", { className: "bg-secondary dark:bg-slate-900 text-white rounded-[3rem] p-10 shadow-3xl sticky top-24 overflow-hidden group border dark:border-slate-800", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-full h-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" }),
        /* @__PURE__ */ jsxs("h3", { className: "text-2xl font-black mb-10 flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(Sparkles, { className: "text-orange-400", size: 28, fill: "currentColor" }),
          "Elite Insight"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-8 mb-12", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-end border-b border-white/5 pb-6", children: [
            /* @__PURE__ */ jsx("span", { className: "text-slate-400 font-bold uppercase tracking-widest text-xs", children: "Quality Score" }),
            /* @__PURE__ */ jsx("span", { className: "text-5xl font-black text-orange-400 leading-none", children: Math.round(product.quality_score || 0) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center border-b border-white/5 pb-6", children: [
            /* @__PURE__ */ jsx("span", { className: "text-slate-400 font-bold uppercase tracking-widest text-xs", children: "Visual Intel" }),
            /* @__PURE__ */ jsx("span", { className: "font-black text-xl", children: product.views.toLocaleString() })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center border-b border-white/5 pb-6", children: [
            /* @__PURE__ */ jsx("span", { className: "text-slate-400 font-bold uppercase tracking-widest text-xs", children: "Endorsements" }),
            /* @__PURE__ */ jsx("span", { className: "font-black text-xl", children: product.likes.length })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "bg-white/5 rounded-2xl p-6 border border-white/10", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400 leading-relaxed font-bold italic", children: '"Our proprietary score blends peer reviews, engagement metrics, and verified visual intelligence."' }) })
      ] }) })
    ] })
  ] });
};
const uploadToCloudinary = async (file) => {
  const cloudName = "prodspark-images";
  const uploadPreset = "prodspark-present";
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData
    }
  );
  if (!response.ok) {
    throw new Error("Failed to upload image to Cloudinary");
  }
  const data = await response.json();
  return data.secure_url;
};
const CATEGORIES = [
  "AI",
  "DevTools",
  "Design",
  "Marketing",
  "Productivity",
  "SEO",
  "No-Code",
  "Other"
];
const SubmitProduct = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [gallery, setGallery] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "AI",
    link: "",
    description: "",
    pricing: "Free",
    tags: ""
  });
  const handleLogoChange = (e) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setLogo(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };
  const handleGalleryChange = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setGallery((prev) => [...prev, ...files]);
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setGalleryPreviews((prev) => [...prev, ...newPreviews]);
    }
  };
  const removeGalleryImage = (index) => {
    setGallery((prev) => prev.filter((_, i) => i !== index));
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !logo) {
      toast.error("Please upload a logo and ensure you are signed in");
      return;
    }
    setLoading(true);
    try {
      const logoUrl = await uploadToCloudinary(logo);
      const galleryUrls = await Promise.all(
        gallery.map((file) => uploadToCloudinary(file))
      );
      const { error } = await supabase.from("products").insert({
        owner_clerk_id: user.id,
        name: formData.name,
        category: formData.category,
        link: formData.link,
        logo_url: logoUrl,
        description: formData.description,
        tags: formData.tags.split(",").map((t) => t.trim()).filter((t) => t),
        pricing: formData.pricing,
        images_urls: galleryUrls
      });
      if (error) throw error;
      toast.success("Your spark has been ignited!");
      navigate("/products");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit product. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen py-20 px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxs(Link, { to: "/products", className: "inline-flex items-center gap-2 text-slate-400 hover:text-primary mb-12 transition-colors font-bold uppercase tracking-widest text-xs", children: [
      /* @__PURE__ */ jsx(ArrowLeft, { size: 18 }),
      "Back to directory"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-[3rem] border-2 border-main p-8 md:p-16 shadow-3xl relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6 mb-12", children: [
          /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary", children: /* @__PURE__ */ jsx(Rocket, { size: 40 }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-black text-main leading-tight", children: "Ignite Your Product" }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-400 font-medium", children: "Showcase your innovation to the world's best creators." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-12", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-12", children: [
            /* @__PURE__ */ jsxs("div", { className: "md:col-span-1", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-black text-main mb-2 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Sparkles, { size: 18, className: "text-primary" }),
                "Identity"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400 font-medium leading-relaxed", children: "Your tool's logo will be its first impression. High resolution recommended." })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "md:col-span-2", children: /* @__PURE__ */ jsxs("label", { className: "group block relative cursor-pointer", children: [
              /* @__PURE__ */ jsx("input", { type: "file", className: "hidden", accept: "image/*", onChange: handleLogoChange }),
              /* @__PURE__ */ jsx("div", { className: `w-32 h-32 rounded-[2rem] border-4 border-dashed transition-all flex items-center justify-center overflow-hidden
                                            ${logoPreview ? "border-primary/20 bg-card" : "border-main bg-slate-50 dark:bg-slate-900 group-hover:border-primary/40 group-hover:bg-primary/5"}`, children: logoPreview ? /* @__PURE__ */ jsx("img", { src: logoPreview, alt: "Logo Preview", className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsx(Upload, { className: "text-slate-300 group-hover:text-primary group-hover:scale-110 transition-all", size: 32 }) }),
              /* @__PURE__ */ jsx("span", { className: "block mt-4 text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-primary transition-colors", children: logoPreview ? "Change Identity" : "Upload Logo" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsx("hr", { className: "border-main" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-12 text-main", children: [
            /* @__PURE__ */ jsxs("div", { className: "md:col-span-1", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-black mb-2 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Type, { size: 18, className: "text-primary" }),
                "Intelligence"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400 font-medium leading-relaxed", children: "Basic information about your elite tool." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "md:col-span-2 space-y-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
                /* @__PURE__ */ jsx("label", { className: "text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block ml-4", children: "Product Name" }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center bg-slate-50 dark:bg-slate-900 border-2 border-main rounded-2xl px-6 focus-within:border-primary focus-within:bg-card transition-all group", children: [
                  /* @__PURE__ */ jsx(Pencil, { size: 18, className: "text-slate-300 group-focus-within:text-primary transition-colors" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      required: true,
                      type: "text",
                      placeholder: "e.g. ProdSpark",
                      className: "w-full py-4 px-4 outline-none bg-transparent font-medium",
                      value: formData.name,
                      onChange: (e) => setFormData({ ...formData, name: e.target.value })
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
                /* @__PURE__ */ jsx("label", { className: "text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block ml-4", children: "Access Point (Link)" }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center bg-slate-50 dark:bg-slate-900 border-2 border-main rounded-2xl px-6 focus-within:border-primary focus-within:bg-card transition-all group", children: [
                  /* @__PURE__ */ jsx(Globe, { size: 18, className: "text-slate-300 group-focus-within:text-primary transition-colors" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      required: true,
                      type: "url",
                      placeholder: "https://your-innovation.com",
                      className: "w-full py-4 px-4 outline-none bg-transparent font-medium",
                      value: formData.link,
                      onChange: (e) => setFormData({ ...formData, link: e.target.value })
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
                /* @__PURE__ */ jsx("label", { className: "text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block ml-4", children: "The Narrative (Description)" }),
                /* @__PURE__ */ jsx("div", { className: "bg-slate-50 dark:bg-slate-900 border-2 border-main rounded-3xl px-6 py-2 focus-within:border-primary focus-within:bg-card transition-all", children: /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    required: true,
                    rows: 5,
                    placeholder: "What problem are you solving? Be descriptive but concise.",
                    className: "w-full py-4 outline-none bg-transparent font-medium resize-none",
                    value: formData.description,
                    onChange: (e) => setFormData({ ...formData, description: e.target.value })
                  }
                ) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("hr", { className: "border-main" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-12 text-main", children: [
            /* @__PURE__ */ jsxs("div", { className: "md:col-span-1", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-black mb-2 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Tag, { size: 18, className: "text-primary" }),
                "Classification"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400 font-medium leading-relaxed", children: "Categorize your tool for easy discovery." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "md:col-span-2 space-y-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx("label", { className: "text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block ml-4", children: "Core Category" }),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setIsCategoryOpen(!isCategoryOpen),
                    className: "w-full flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-slate-900 border-2 border-main rounded-2xl hover:border-primary/20 transition-all font-medium",
                    children: [
                      /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-3", children: [
                        /* @__PURE__ */ jsx(Layers, { size: 18, className: "text-primary" }),
                        formData.category
                      ] }),
                      /* @__PURE__ */ jsx(motion.div, { animate: { rotate: isCategoryOpen ? 180 : 0 }, children: /* @__PURE__ */ jsx(ChevronDown, { size: 18 }) })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(AnimatePresence, { children: isCategoryOpen && /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-20", onClick: () => setIsCategoryOpen(false) }),
                  /* @__PURE__ */ jsx(
                    motion.div,
                    {
                      initial: { opacity: 0, y: 10 },
                      animate: { opacity: 1, y: 0 },
                      exit: { opacity: 0, y: 10 },
                      className: "absolute top-full left-0 right-0 mt-3 z-30 bg-white dark:bg-slate-950 border-2 border-main rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-2 overflow-hidden",
                      children: /* @__PURE__ */ jsx("div", { className: "max-h-60 overflow-y-auto custom-scrollbar", children: CATEGORIES.map((cat) => /* @__PURE__ */ jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => {
                            setFormData({ ...formData, category: cat });
                            setIsCategoryOpen(false);
                          },
                          className: `w-full text-left px-5 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${formData.category === cat ? "bg-primary text-white" : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500"}`,
                          children: cat
                        },
                        cat
                      )) })
                    }
                  )
                ] }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
                /* @__PURE__ */ jsx("label", { className: "text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block ml-4", children: "Pricing Model" }),
                /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-4", children: ["Free", "Premium", "Paid"].map((type) => /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setFormData({ ...formData, pricing: type }),
                    className: `py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all border-2
                                                        ${formData.pricing === type ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" : "bg-slate-50 dark:bg-slate-900 border-main text-slate-400 hover:border-primary/20"}`,
                    children: type
                  },
                  type
                )) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
                /* @__PURE__ */ jsx("label", { className: "text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block ml-4", children: "Tags (Comma Separated)" }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center bg-slate-50 dark:bg-slate-900 border-2 border-main rounded-2xl px-6 focus-within:border-primary focus-within:bg-card transition-all group", children: [
                  /* @__PURE__ */ jsx(CreditCard, { size: 18, className: "text-slate-300 group-focus-within:text-primary transition-colors" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      placeholder: "ai, dev-tools, design, productivity",
                      className: "w-full py-4 px-4 outline-none bg-transparent font-medium",
                      value: formData.tags,
                      onChange: (e) => setFormData({ ...formData, tags: e.target.value })
                    }
                  )
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("hr", { className: "border-main" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-12 text-main", children: [
            /* @__PURE__ */ jsxs("div", { className: "md:col-span-1", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-black mb-2 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Image, { size: 18, className: "text-primary" }),
                "Visual Intel"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400 font-medium leading-relaxed", children: "Add screenshots or mockups of your interface." })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "md:col-span-2", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4", children: [
              galleryPreviews.map((url, i) => /* @__PURE__ */ jsxs("div", { className: "relative aspect-video rounded-2xl overflow-hidden group shadow-md border-2 border-main", children: [
                /* @__PURE__ */ jsx("img", { src: url, alt: "Gallery Preview", className: "w-full h-full object-cover" }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => removeGalleryImage(i),
                    className: "absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity",
                    children: /* @__PURE__ */ jsx(X, { size: 14 })
                  }
                )
              ] }, i)),
              /* @__PURE__ */ jsxs("label", { className: "aspect-video bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-main rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all group text-slate-300 hover:text-primary", children: [
                /* @__PURE__ */ jsx("input", { type: "file", className: "hidden", multiple: true, accept: "image/*", onChange: handleGalleryChange }),
                /* @__PURE__ */ jsx(Plus, { size: 24, className: "group-hover:scale-110 transition-all" }),
                /* @__PURE__ */ jsx("span", { className: "mt-2 text-[10px] font-black uppercase tracking-widest", children: "Add Preview" })
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "pt-12", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                disabled: loading,
                type: "submit",
                className: "btn-primary w-full flex items-center justify-center gap-4 py-6 text-xl shadow-2xl relative overflow-hidden group",
                children: [
                  /* @__PURE__ */ jsx("span", { className: "relative z-10 flex items-center gap-4", children: loading ? /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(Loader2, { size: 24, className: "animate-spin" }),
                    "Igniting The Spark..."
                  ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(CheckCircle2, { size: 24 }),
                    "Launch Intelligence Now"
                  ] }) }),
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 bottom-0 h-1 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" })
                ]
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "text-center mt-6 text-[11px] font-black uppercase tracking-[0.3em] text-slate-300 dark:text-slate-700", children: "Premium Submission Node 0x7F42" })
          ] })
        ] })
      ] })
    ] })
  ] }) });
};
const SignInPage = () => {
  return /* @__PURE__ */ jsx("div", { className: "min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-slate-50", children: /* @__PURE__ */ jsx("div", { className: "w-full max-w-md", children: /* @__PURE__ */ jsx(
    SignIn,
    {
      routing: "path",
      path: "/sign-in",
      signUpUrl: "/sign-up",
      appearance: {
        elements: {
          formButtonPrimary: "bg-primary hover:bg-orange-600 text-sm normal-case",
          card: "shadow-xl border border-slate-100 rounded-3xl",
          headerTitle: "text-2xl font-bold text-secondary",
          headerSubtitle: "text-slate-500"
        }
      }
    }
  ) }) });
};
const ThemeContext = createContext(void 0);
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("prodspark-theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("prodspark-theme", theme);
  }, [theme]);
  const toggleTheme = () => {
    setTheme((prev) => prev === "light" ? "dark" : "light");
  };
  return /* @__PURE__ */ jsx(ThemeContext.Provider, { value: { theme, toggleTheme }, children });
};
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === void 0) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return /* @__PURE__ */ jsxs(
    "button",
    {
      onClick: toggleTheme,
      className: "relative p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-primary transition-colors active:scale-95 overflow-hidden",
      "aria-label": "Toggle theme",
      children: [
        /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", initial: false, children: /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { y: 20, opacity: 0, rotate: 45 },
            animate: { y: 0, opacity: 1, rotate: 0 },
            exit: { y: -20, opacity: 0, rotate: -45 },
            transition: { duration: 0.2, ease: "easeInOut" },
            children: theme === "light" ? /* @__PURE__ */ jsx(Moon, { size: 20 }) : /* @__PURE__ */ jsx(Sun, { size: 20 })
          },
          theme
        ) }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-primary/5 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" })
      ]
    }
  );
};
const Navbar = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleSubmitClick = () => {
    if (!isSignedIn) {
      navigate("/sign-in");
    } else {
      navigate("/submit");
    }
  };
  return /* @__PURE__ */ jsxs("nav", { className: "sticky top-0 z-50 px-4 py-4 pointer-events-none", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { y: -20, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        className: "max-w-7xl mx-auto glass rounded-2xl md:rounded-full px-6 py-3 pointer-events-auto flex justify-between items-center",
        children: [
          /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 group", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx("img", { src: "/logo-icon.png", alt: "ProdSpark Logo", className: "h-9 w-9 group-hover:rotate-12 transition-transform duration-300" }),
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  animate: { opacity: [0, 1, 0] },
                  transition: { repeat: Infinity, duration: 2 },
                  className: "absolute -top-1 -right-1 text-primary",
                  children: /* @__PURE__ */ jsx(Sparkles, { size: 12, fill: "currentColor" })
                }
              )
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-2xl font-black bg-gradient-to-r from-secondary via-secondary to-primary bg-clip-text text-transparent tracking-tighter dark:from-white dark:via-white dark:to-primary", children: "ProdSpark" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center gap-6", children: [
            /* @__PURE__ */ jsxs(Link, { to: "/products", className: "text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors flex items-center gap-1 group", children: [
              "Browse",
              /* @__PURE__ */ jsx("span", { className: "h-1 w-0 bg-primary group-hover:w-full transition-all duration-300 rounded-full" })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handleSubmitClick,
                className: "text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors cursor-pointer",
                children: "Submit"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "h-6 w-px bg-slate-200 dark:bg-slate-700" }),
            /* @__PURE__ */ jsx(ThemeToggle, {}),
            /* @__PURE__ */ jsx(SignedIn, { children: /* @__PURE__ */ jsx(
              UserButton,
              {
                afterSignOutUrl: "/",
                appearance: {
                  elements: {
                    userButtonAvatarBox: "w-9 h-9 border-2 border-primary/20 hover:border-primary transition-colors"
                  }
                }
              }
            ) }),
            /* @__PURE__ */ jsx(SignedOut, { children: /* @__PURE__ */ jsx(
              Link,
              {
                to: "/sign-in",
                className: "bg-secondary dark:bg-slate-100 dark:text-secondary text-white px-6 py-2 rounded-full text-sm font-black hover:bg-slate-800 dark:hover:bg-white transition-all shadow-lg shadow-slate-200 dark:shadow-none active:scale-95",
                children: "Sign In"
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "md:hidden flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(ThemeToggle, {}),
            /* @__PURE__ */ jsx(SignedIn, { children: /* @__PURE__ */ jsx(UserButton, { afterSignOutUrl: "/" }) }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setIsMenuOpen(!isMenuOpen),
                className: "p-2 text-secondary dark:text-white bg-slate-100 dark:bg-slate-800 rounded-xl active:scale-90 transition-transform",
                children: isMenuOpen ? /* @__PURE__ */ jsx(X, { size: 24 }) : /* @__PURE__ */ jsx(Menu, { size: 24 })
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { children: isMenuOpen && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
        className: "md:hidden mt-2 pointer-events-auto",
        children: /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-4 space-y-3", children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/products",
              className: "block text-lg font-bold text-secondary dark:text-white px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors",
              onClick: () => setIsMenuOpen(false),
              children: "Browse Tools"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => {
                handleSubmitClick();
                setIsMenuOpen(false);
              },
              className: "w-full text-left block text-lg font-bold text-secondary dark:text-white px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors",
              children: "Submit Product"
            }
          ),
          /* @__PURE__ */ jsx(SignedOut, { children: /* @__PURE__ */ jsx(
            Link,
            {
              to: "/sign-in",
              className: "block text-center bg-primary text-white px-4 py-4 rounded-xl font-black text-lg shadow-lg shadow-primary/20",
              onClick: () => setIsMenuOpen(false),
              children: "Join ProdSpark"
            }
          ) })
        ] })
      }
    ) })
  ] });
};
const Footer = () => {
  return /* @__PURE__ */ jsxs("footer", { className: "bg-white dark:bg-slate-950 border-t border-main pt-24 pb-12 overflow-hidden relative", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 right-0 w-1/3 h-1/2 bg-primary/5 blur-[120px] pointer-events-none" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20", children: [
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-1", children: [
          /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 mb-8 group", children: [
            /* @__PURE__ */ jsx("img", { src: "/logo-icon.png", alt: "Logo", className: "h-8 w-8 group-hover:rotate-12 transition-transform duration-300" }),
            /* @__PURE__ */ jsx("span", { className: "text-2xl font-black bg-gradient-to-r from-secondary via-secondary to-primary bg-clip-text text-transparent dark:from-white dark:via-white dark:to-primary", children: "ProdSpark" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-8", children: "Empowering the next generation of creators with verified elite products and tools. Ignite your innovation today." }),
          /* @__PURE__ */ jsx("div", { className: "flex gap-4", children: [
            { icon: /* @__PURE__ */ jsx(Twitter, { size: 18 }), link: "#" },
            { icon: /* @__PURE__ */ jsx(Github, { size: 18 }), link: "#" },
            { icon: /* @__PURE__ */ jsx(Linkedin, { size: 18 }), link: "#" }
          ].map((social, i) => /* @__PURE__ */ jsx(
            "a",
            {
              href: social.link,
              className: "w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 border border-main flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/20 transition-all",
              children: social.icon
            },
            i
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "font-black text-main uppercase tracking-widest text-xs mb-8", children: "Navigation" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/products", className: "text-slate-500 dark:text-slate-400 hover:text-primary font-bold transition-colors", children: "Browse Catalog" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/submit", className: "text-slate-500 dark:text-slate-400 hover:text-primary font-bold transition-colors", children: "Submit Product" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "text-slate-500 dark:text-slate-400 hover:text-primary font-bold transition-colors", children: "Featured Sparks" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "text-slate-500 dark:text-slate-400 hover:text-primary font-bold transition-colors", children: "Quality Score Guide" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "font-black text-main uppercase tracking-widest text-xs mb-8", children: "Ecosystem" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "text-slate-500 dark:text-slate-400 hover:text-primary font-bold transition-colors", children: "Maker Dashboard" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "text-slate-500 dark:text-slate-400 hover:text-primary font-bold transition-colors", children: "Partner Program" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "text-slate-500 dark:text-slate-400 hover:text-primary font-bold transition-colors", children: "API Access" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "text-slate-500 dark:text-slate-400 hover:text-primary font-bold transition-colors", children: "Resources" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h4", { className: "font-black text-main uppercase tracking-widest text-xs mb-8 flex items-center gap-2", children: [
            "Weekly Insight ",
            /* @__PURE__ */ jsx(Sparkles, { size: 14, className: "text-primary" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400 mb-6 font-medium", children: "Join 12,000+ creators receiving the best tools in their inbox." }),
          /* @__PURE__ */ jsx("form", { className: "relative group", onSubmit: (e) => e.preventDefault(), children: /* @__PURE__ */ jsxs("div", { className: "flex items-center bg-slate-50 dark:bg-slate-900 border-2 border-main rounded-2xl px-5 focus-within:border-primary/40 focus-within:bg-white dark:focus-within:bg-slate-900 transition-all", children: [
            /* @__PURE__ */ jsx(Mail, { size: 18, className: "text-slate-300 group-focus-within:text-primary transition-colors" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                placeholder: "Enter your email",
                className: "w-full py-4 px-3 outline-none bg-transparent font-medium text-sm"
              }
            ),
            /* @__PURE__ */ jsx("button", { className: "text-primary hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(Send, { size: 18 }) })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "pt-12 border-t border-main flex flex-col md:flex-row justify-between items-center gap-8", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-black text-slate-400 tracking-[0.2em] uppercase", children: "© 2026 PRODSPARK ECOSYSTEM • ALL INTEL SECURED" }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-10", children: [
          /* @__PURE__ */ jsx("a", { href: "#", className: "text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors", children: "Privacy Protocal" }),
          /* @__PURE__ */ jsx("a", { href: "#", className: "text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors", children: "Terms of Experience" })
        ] })
      ] })
    ] })
  ] });
};
const CLERK_PUBLISHABLE_KEY = "pk_test_c2ltcGxlLWZyb2ctODcuY2xlcmsuYWNjb3VudHMuZGV2JA";
function App() {
  return /* @__PURE__ */ jsx(HelmetProvider, { children: /* @__PURE__ */ jsx(ClerkProvider, { publishableKey: CLERK_PUBLISHABLE_KEY, children: /* @__PURE__ */ jsx(ThemeProvider, { children: /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("main", { className: "flex-grow", children: /* @__PURE__ */ jsx(Outlet, {}) }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(Toaster, { position: "bottom-right" })
  ] }) }) }) });
}
const routes = [
  {
    path: "/",
    element: /* @__PURE__ */ jsx(App, {}),
    children: [
      {
        index: true,
        element: /* @__PURE__ */ jsx(Home, {})
      },
      {
        path: "products",
        element: /* @__PURE__ */ jsx(Products, {})
      },
      {
        path: "products/:id",
        element: /* @__PURE__ */ jsx(ProductDetails, {})
      },
      {
        path: "submit",
        element: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(SignedIn, { children: /* @__PURE__ */ jsx(SubmitProduct, {}) }),
          /* @__PURE__ */ jsx(SignedOut, { children: /* @__PURE__ */ jsx(RedirectToSignIn, {}) })
        ] })
      },
      {
        path: "sign-in/*",
        element: /* @__PURE__ */ jsx(SignInPage, {})
      },
      {
        path: "sign-up/*",
        element: /* @__PURE__ */ jsx(SignInPage, {})
      },
      {
        path: "*",
        element: /* @__PURE__ */ jsx(Navigate, { to: "/", replace: true })
      }
    ]
  }
];
const main = ViteReactSSG({
  routes
});
export {
  main as default
};
