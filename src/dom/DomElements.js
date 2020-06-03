const DomElements = (() => {

  const createDomElement = (tag, attr = null, value = null) => {
    let result = null;
    
    if (tag === 'div') {
      result = document.createElement(tag);
    } else if (tag === 'p') {
      result = document.createElement(tag);
    } else if (tag === 'h1' || tag === 'h2' || tag === 'h3' || tag === 'h4' || tag === 'h5' || tag === 'h6') {
      result = document.createElement(tag);
    } else if (tag === 'form') {
      result = document.createElement(tag);
    } else if (tag === 'span') {
      result = document.createElement(tag);
    } else if (tag === 'input') {
      result = document.createElement(tag);
    } else if (tag === 'button') {
      result = document.createElement(tag);
    } else if (tag === 'a') {
      result = document.createElement(tag);
    }

    if (!(attr === null && value === null)) {
      result.setAttribute(attr, value);
    }
    
    return result;
  }

  return {
    createDomElement
  };

})();

export default DomElements;