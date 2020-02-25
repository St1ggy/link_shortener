import React from 'react'

export const Loader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
    <div className="spinner-layer spinner-red">
      <div className="circle-clipper left">
        <div className="circle"/>
      </div>
      <div className="gap-patch">
        <div className="circle"/>
      </div>
      <div className="circle-clipper right">
        <div className="circle"/>
      </div>
    </div>
  </div>
)