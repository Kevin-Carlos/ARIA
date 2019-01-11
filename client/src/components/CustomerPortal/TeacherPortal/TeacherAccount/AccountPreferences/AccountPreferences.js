import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
});

class CheckboxesGroup extends Component {
  state = {
    prefOne: true,
    prefTwo: true,
    prefThree: true,
  };

  handleChange = name => (event) => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes } = this.props;

    const {
      prefOne,
      prefTwo,
      prefThree,
    } = this.state;

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Preferences</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={(
                <Checkbox
                  checked={prefOne}
                  onChange={this.handleChange('prefOne')}
                  value="Receive communication from NNMTA by registered email address"
                  color="primary"
                />
              )}
              label="Allow NNMTA to send e-mails to &lt;teacher's email address&gt;"
            />
            <FormControlLabel
              control={(
                <Checkbox
                  checked={prefTwo}
                  onChange={this.handleChange('prefTwo')}
                  value="Receive notifications about upcoming events"
                  color="primary"
                />
              )}
              label="Receive NNMTA newsletters (hear about exciting things going on with NNMTA)"
            />
            <FormControlLabel
              control={(
                <Checkbox
                  checked={prefThree}
                  onChange={this.handleChange('prefThree')}
                  value="Receive reminders about student registrations"
                  color="primary"
                />
              )}
              label="Receive NNMTA notifications (new events, event updates, etc.)"
            />
          </FormGroup>
          <FormHelperText>*Save your preferences below for them to take effect</FormHelperText>
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(CheckboxesGroup);
