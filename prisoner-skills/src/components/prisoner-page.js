import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { personalInfo } from '../actions'

class PrisonerPage extends React.Component {

  componentDidMount(){
    this.props.personalInfo(this.props.match.params.id)
  }

  render(){
    const pers = this.props.prisoners.find( p => String(p.id) === this.props.match.params.id)
    return(
      <div>
        <nav className="trinket-nav">
          <Link exact to={`/prisoner/${this.props.match.params.id}/edit`} >Edit</Link>
          <button >Free the prisoner</button>
        </nav>

        { pers === undefined ?
          (<p>Getting prisoner info...</p>) :
          ( <div>
              <p>{pers.name}</p>
              <span>Skills:</span>
            </div>
          )
        }
        { pers === undefined ?
          (<p>Getting prisoner skills...</p>) :
          ( pers.skills === undefined ?
              <span>no skills to display</span> :
              pers.skills.map(skill => {
              return(
                <span key={skill.id}>{`${skill.name} `}</span>
              )
            })
          )
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    prisoners: state.prisoners
  }
}

const mapDispatchToProps = {
  personalInfo: personalInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(PrisonerPage)