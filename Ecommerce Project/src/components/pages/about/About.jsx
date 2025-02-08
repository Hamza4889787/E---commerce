import { useProductContext } from "../../../context/Context";

function About() {
  const name = useProductContext();

  return <div>{name}</div>;
}

export default About;
