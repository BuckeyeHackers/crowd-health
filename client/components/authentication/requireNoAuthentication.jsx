import requireAuthenticationOrNot from './requireAuthenticationOrNot';

export default WrappedComponent => requireAuthenticationOrNot(false)(WrappedComponent);
