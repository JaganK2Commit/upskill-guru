import { mergeStyleSets } from '@uifabric/merge-styles';
import theme, { layout } from '../../theme.style';

export default mergeStyleSets({
  links: {
    color: 'white',
    alignItems: 'right',
    ':hover': {
      color: '#d7f1fa'
   }
    // textDecoration: 'underline'
  }
});