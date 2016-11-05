import requireAuthenticationOrNot from './requireAuthenticationOrNot';

export default WrappedComponent => requireAuthenticationOrNot(true)(WrappedComponent);
