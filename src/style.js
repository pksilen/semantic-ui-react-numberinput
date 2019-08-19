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
    input: {
      borderRadius: 0
    },
    button: {
      base: {
        lineHeight: 'calc(1em + 2px)',
        margin: 0
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
  }
};

export default style;
