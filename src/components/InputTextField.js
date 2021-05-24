import '../styles/InputTextField.scss';

export const Input = ({ label, type="text", value, handleChange, id, name, className = '', error='', isTouched=false }) => {
  const enhancedClass = `input-container ${className}` ;
  console.log(error, isTouched)
  return(
    <div className={enhancedClass}>
      <label htmlFor={id}>{label}</label>
      <br />
      <input className={error ? 'input-error' : ''} type={type} value={value} onChange={handleChange} id={id} name={name}/>
      {error && isTouched && <p className="error-message">{`${error} ${label}`}</p>}
    </div>
  )
}