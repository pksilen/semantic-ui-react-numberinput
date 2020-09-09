// @flow

const style = {
  common: {
    input: {
      textAlign: 'right'
    }
  },
  right: {
    outerDiv: {
      display: 'flex'
    },
    input: {
      borderBottomRightRadius: 0,
      borderTopRightRadius: 0
    },
    button: {
      div: {
        display: 'flex',
        flexDirection: 'column'
      },
      base: {
        flex: '0 0 50%',
        minHeight: 'unset',
        margin: 0,
        maxHeight: 'unset',
        padding: '0 0.2em'
      },
      increment: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 0
      },
      decrement: {
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
      }
    }
  },
  leftAndRight: {
    outerDiv: {
      display: 'flex'
    },
    input: {
      borderRadius: 0
    },
    button: {
      base: {
        minHeight: 'unset',
        margin: 0,
        maxHeight: 'unset'
      },
      increment: {
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0
      },
      decrement: {
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0
      }
    }
  },
  none: {
    outerDiv: {
      display: 'flex'
    },
    button: {
      display: 'none'
    }
  }
};

export default style;
