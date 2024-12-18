import "../index.css";
import { styled } from "@mui/system";


const FooterContainer = styled("footer")({
  backgroundColor: "#353640",
  padding: "20px",
  textAlign: "center",
  fontFamily: "Arial, sans-serif",
});

const FooterText = styled("span")({
  fontSize: "14px",
  color: "white",
});

const SubscribeLink = styled("a")({
  color: "white",
  textDecoration: "underline",
  "&:hover": {
    color: "#ff6600",
  },
});

const DisclaimerText = styled("span")({
  fontSize: "12px",
  color: "#888",
});

function Footer() {
  return (
    <FooterContainer>
      <FooterText>
        colorful xg is built by mike maquera.
      </FooterText>
      <hr style={{ borderColor: "white", marginBottom: "5px" }} />
      <DisclaimerText>
        {" "}
        Data provided by statsbomb. This site is not affiliated with or endorsed by any professional sports.
      </DisclaimerText>
    </FooterContainer>
  );
}

export default Footer;
