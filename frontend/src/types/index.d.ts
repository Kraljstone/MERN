declare module 'react-file-base64';
declare module '*.module.css' {
  // This interface represents the mapping of CSS class names to string
  interface ClassNames {
    [className: string]: string;
  }
  // This exports a default object containing all CSS class names
  const classNames: ClassNames;
  export default classNames;
}
