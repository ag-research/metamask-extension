import {
  FontWeight,
  BlockSize,
  AlignItems,
  FlexDirection,
  JustifyContent,
  TypographyVariant,
  TextAlign,
} from '../../../helpers/constants/design-system';
import { processString } from '../util';

function getValues(pendingApproval, t, actions, _history) {
  return {
    content: [
      {
        key: 'header',
        element: 'Box',
        props: {
          flexDirection: FlexDirection.Column,
          alignItems: AlignItems.center,
          height: BlockSize.Full,
          padding: 4,
        },
        children: [
          ...(pendingApproval.requestData.header || []),
          {
            key: 'content',
            element: 'Box',
            props: {
              flexDirection: FlexDirection.Column,
              alignItems: AlignItems.center,
              justifyContent: JustifyContent.center,
              height: BlockSize.Full,
              paddingTop: 2,
              paddingBottom: 2,
            },
            children: [
              {
                key: 'heading',
                element: 'Typography',
                props: {
                  variant: TypographyVariant.H3,
                  fontWeight: FontWeight.Bold,
                  paddingBottom: 2,
                },
                children: 'Success',
              },
              {
                key: 'message',
                element: 'Box',
                props: {
                  alignItems: AlignItems.Center,
                  textAlign: TextAlign.Center,
                },
                children: processString(
                  pendingApproval.requestData.message,
                  'The operation completed successfully.',
                ),
              },
            ],
          },
        ],
      },
    ],
    submitText: t('ok'),
    onSubmit: () =>
      actions.resolvePendingApproval(
        pendingApproval.id,
        pendingApproval.requestData,
      ),
    networkDisplay: false,
  };
}

const success = {
  getValues,
};

export default success;