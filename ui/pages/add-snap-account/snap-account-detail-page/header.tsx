import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ConfigureSnapPopup from '../../../components/app/configure-snap-popup/configure-snap-popup';
import {
  BUTTON_VARIANT,
  Box,
  Button,
  Icon,
  IconName,
  Tag,
  Text,
} from '../../../components/component-library';
import {
  AlignItems,
  BackgroundColor,
  BorderColor,
  Display,
  FlexDirection,
  JustifyContent,
  TextColor,
  TextVariant,
} from '../../../helpers/constants/design-system';
import { useI18nContext } from '../../../hooks/useI18nContext';
import { installSnapFromSnapAccounts } from '../../../store/actions';
import { SnapCardProps } from '../new-snap-account-page/new-snap-account-page';

export const SnapDetailHeader = ({
  updateAvailable,
  snapTitle,
  isInstalled,
  iconUrl,
  developer,
  auditUrls,
  website,
  snapId,
}: Pick<
  SnapCardProps,
  | 'updateAvailable'
  | 'snapTitle'
  | 'isInstalled'
  | 'iconUrl'
  | 'developer'
  | 'auditUrls'
  | 'website'
  | 'snapId'
>) => {
  const t = useI18nContext();
  const [showConfigPopover, setShowConfigPopover] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <Box marginBottom={5}>
        <Box
          display={Display.Flex}
          flexDirection={FlexDirection.Row}
          alignItems={AlignItems.center}
          marginBottom={4}
        >
          <Button
            variant={BUTTON_VARIANT.LINK}
            marginRight={4}
            onClick={() => history.back()}
          >
            {t('snapDetailsCreateASnapAccount')}
          </Button>
          <Icon name={IconName.ArrowRight} marginRight={4} />
          <Text>{snapTitle}</Text>
        </Box>
        <Box
          display={Display.Flex}
          justifyContent={JustifyContent.spaceBetween}
        >
          <Box
            display={Display.Flex}
            flexDirection={FlexDirection.Row}
            alignItems={AlignItems.center}
          >
            <Text variant={TextVariant.headingLg} marginRight={1}>
              {snapTitle}
            </Text>
            {isInstalled && (
              <Tag
                label={t('snapDetailsInstalled') as string}
                labelProps={{
                  color: TextColor.textAlternative,
                }}
                className=""
                height={2}
              />
            )}
          </Box>
          <Box>
            {isInstalled && updateAvailable && (
              <Button
                variant={BUTTON_VARIANT.PRIMARY}
                marginRight={1}
                onClick={() => {
                  dispatch(installSnapFromSnapAccounts(snapId));
                }}
              >
                {t('snapUpdateAvailable')}
              </Button>
            )}
            {isInstalled && (
              <Button
                variant={BUTTON_VARIANT.PRIMARY}
                onClick={() => setShowConfigPopover(true)}
              >
                {t('snapConfigure')}
              </Button>
            )}
            {!isInstalled && (
              <Button
                variant={BUTTON_VARIANT.PRIMARY}
                onClick={() => {
                  dispatch(installSnapFromSnapAccounts(snapId));
                }}
              >
                {t('snapInstall')}
              </Button>
            )}
          </Box>
        </Box>
        <Box
          display={Display.Flex}
          flexDirection={FlexDirection.Row}
          alignItems={AlignItems.center}
        >
          <Box
            display={Display.Flex}
            justifyContent={JustifyContent.center}
            alignItems={AlignItems.center}
            style={{
              borderRadius: '50%',
              height: '32px',
              width: '32px',
            }}
            borderWidth={1}
            borderColor={BorderColor.borderMuted}
            padding={[2, 2, 2, 2]}
            marginRight={1}
          >
            <img src={iconUrl} className="snap-detail-icon" />
          </Box>
          {developer === 'Metamask' && (
            <Tag
              color={TextColor.infoDefault}
              backgroundColor={BackgroundColor.infoMuted}
              borderColor={BackgroundColor.infoMuted}
              label={
                <Box
                  display={Display.Flex}
                  justifyContent={JustifyContent.center}
                  alignItems={AlignItems.center}
                >
                  <Icon name={IconName.Star} />{' '}
                  <Text
                    color={TextColor.infoDefault}
                    variant={TextVariant.bodySm}
                  >
                    {t('snapCreatedByMetaMask')}
                  </Text>
                </Box>
              }
              labelProps={{
                color: TextColor.infoDefault,
              }}
              className=""
              marginRight={1}
            />
          )}
          {auditUrls.length > 0 && (
            <Tag
              color={TextColor.infoDefault}
              backgroundColor={BackgroundColor.infoMuted}
              borderColor={BackgroundColor.infoMuted}
              label={
                <Box
                  display={Display.Flex}
                  justifyContent={JustifyContent.center}
                  alignItems={AlignItems.center}
                >
                  <Icon name={IconName.Star} />{' '}
                  <Text
                    color={TextColor.infoDefault}
                    variant={TextVariant.bodySm}
                  >
                    {t('snapIsAudited')}
                  </Text>
                </Box>
              }
              labelProps={{
                color: TextColor.infoDefault,
              }}
              className=""
            />
          )}
        </Box>
      </Box>
      {showConfigPopover && (
        <ConfigureSnapPopup
          onClose={() => setShowConfigPopover(false)}
          link={website}
        />
      )}
    </>
  );
};