export default function Main(props) {
  const {data } = props;

  return (
    <div className="imgContainer">
      <img src={data?.hdurl} alt = "mars image" className="bgImage"/>
    </div>
  )
}
