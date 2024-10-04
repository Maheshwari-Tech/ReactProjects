export default function Footer(props) {
  const {handleToggleModal, data} = props;

  return (
    <footer>
      <div>
        <h1>NASA APOD Project</h1>
        <h2>{data?.title}</h2>
       </div>
      <button onClick={handleToggleModal}>
        <i className="fa-solid fa-info"></i>
      </button>
    </footer>
  )
}
