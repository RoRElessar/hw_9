import React from 'react';

export const FormErrorsComponent = (formErrors) =>
  <div className="form-errors">
    {Object.keys(formErrors.formErrors).map((fieldName, i) => {
      if(formErrors.formErrors[fieldName].length > 0){
        return (
          <p key={i}>{fieldName} {formErrors.formErrors[fieldName]}</p>
        )
      } else {
        return '';
      }
    })}
  </div>
