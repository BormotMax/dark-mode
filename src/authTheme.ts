export const Container = {
  fontFamily: `"Roboto", sans-serif`,
}

export const FormContainer = {
  textAlign: "center",
  marginTop: "20px",
  margin: "50px auto",
}

export const FormSection = {
  position: "relative",
  margin: "auto",
  backgroundColor: "#fff",
  padding: "35px 40px",
  textAlign: "left",
  display: "inline-block",
  minWidth: "365px",
}

export const FormField = {
  marginBottom: "10px",
}

export const SectionHeader = {
  fontWeight: "500",
  lineHeight: "42px",
  fontSize: "36px",
  marginBottom: "16px",
}

export const SectionBody = {
  maxWidth: "336px",
  margin: "0 auto 30px auto",
}

export const SectionFooter = {
  fontSize: "14px",
  color: "#828282",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "0 auto 30px auto",
  maxWidth: "336px",
}

export const SectionFooterPrimaryContent = {
  width: "100%",
  borderRadius: "100px",
  marginBottom: "15px",
}

export const SectionFooterSecondaryContent = {
  color: "#1D3557",
  fontSize: "18px",
  width: "100%",
  textAlign: "center",
  letterSpacing: "0.271875px",
}

export const Input = {
  display: "block",
  width: "100%",
  padding: "7px 15px",
  fontSize: "18px",
  lineHeight: "33px",
  color: "#152939",
  backgroundColor: "#fff",
  border: "1px solid #BDBDBD",
  borderRadius: "100px",
  marginBottom: "0px",
}

export const Button = {
  width: "100%",
  height: "64px",
  display: "block",
  fontSize: "21px",
  fontWeight: 500,
  letterSpacing: "0.271875px",
  lineHeight: "25px",
  textAlign: "center",
  outline: "none",
  whiteSpace: "nowrap",
  verticalAlign: "middle",
  touchAction: "manipulation",
  cursor: "pointer",
  borderRadius: "100px",
  userSelect: "none",
  color: "#fff",
  backgroundColor: "#3C78FB",
  padding: "14px 0",
  border: "none",
}

export const SignInButton = {
  position: "relative",
  width: "100%",
  borderRadius: "4px",
  marginBottom: "10px",
  cursor: "pointer",
  padding: 0,
  color: "#fff",
  fontSize: "14px",
  "#google_signin_btn": {
    backgroundColor: "#4285F4",
    fontFamily: "Roboto",
    border: "1px solid #4285F4",
  },
  "#facebook_signin_btn": {
    backgroundColor: "#4267B2",
    borderColor: "#4267B2",
  },
  "#amazon_signin_btn": {
    backgroundColor: "#FF9900",
    border: "none",
  },
}

export const SignInButtonIcon = {
  position: "absolute",
  left: 0,
  "#google_signin_btn_icon": {
    backgroundColor: "#fff",
    borderRadius: "4px 0 0 4px",
    height: "30px",
    width: "30px",
    padding: "11px",
  },
  "#facebook_signin_btn_icon": {
    height: "33px",
    width: "18px",
    padding: "10px 14px",
  },
  "#amazon_signin_btn_icon": {
    padding: "10px",
    height: "32px",
    width: "32px",
  },
}

export const SignInButtonContent = {
  display: "block",
  padding: "18px 0",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  textAlign: "center",
}

export const Strike = {
  width: "100%",
  textAlign: "center",
  borderBottom: "1px solid #bbb",
  lineHeight: "0.1em",
  margin: "32px 0",
  color: "#828282",
}

export const StrikeContent = {
  background: "#fff",
  padding: "0 25px",
  fontSize: "14px",
  fontWeight: "500",
}

export const ActionRow = {
  marginBottom: "15px",
}

export const FormRow = {
  marginBottom: "12px",
}

export const A = {
  color: "#3C78FB",
  cursor: "pointer",
}

export const Hint = {
  color: "#828282",
  fontSize: "14px",
  lineHeight: "33px",
  fontWeight: "300",
  marginTop: "8px",
  letterSpacing: "0.271875px",
}

export const Radio = {
  marginRight: "18px",
  verticalAlign: "bottom",
}

export const InputLabel = {
  color: "#828282",
  fontSize: "18px",
  lineHeight: "33px",
  letterSpacing: "0.271875px",
}

const AuthTheme = {
  container: Container,
  formContainer: FormContainer,
  formSection: FormSection,
  formField: FormField,

  sectionHeader: SectionHeader,
  sectionBody: SectionBody,
  sectionFooter: SectionFooter,
  sectionFooterPrimaryContent: SectionFooterPrimaryContent,
  sectionFooterSecondaryContent: SectionFooterSecondaryContent,

  input: Input,
  button: Button,
  signInButton: SignInButton,
  signInButtonIcon: SignInButtonIcon,
  signInButtonContent: SignInButtonContent,
  formRow: FormRow,
  strike: Strike,
  strikeContent: StrikeContent,
  actionRow: ActionRow,
  a: A,

  hint: Hint,
  radio: Radio,
  inputLabel: InputLabel,
}

export default AuthTheme
