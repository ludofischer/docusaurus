/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {useState, useRef, CSSProperties} from 'react';
import type {Props} from '@theme/Toggle';
import {useThemeConfig} from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import clsx from 'clsx';
import styles from './styles.module.css';

interface IconProps {
  icon: string;
  style: CSSProperties;
}

const Dark = ({icon, style}: IconProps): JSX.Element => (
  <span className={clsx(styles.toggle, styles.dark)} style={style}>
    {icon}
  </span>
);
const Light = ({icon, style}: IconProps): JSX.Element => (
  <span className={clsx(styles.toggle, styles.light)} style={style}>
    {icon}
  </span>
);

export default function (props: Props): JSX.Element {
  const {className, checked: defaultChecked, onChange} = props;
  const {
    colorMode: {
      switchConfig: {darkIcon, darkIconStyle, lightIcon, lightIconStyle},
    },
  } = useThemeConfig();
  const {isClient} = useDocusaurusContext();
  const [checked, setChecked] = useState(defaultChecked);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleToggle = (e) => {
    const checkbox = inputRef.current;

    if (!checkbox) {
      return;
    }

    if (e.target !== checkbox) {
      e.preventDefault();
      checkbox.focus();
      checkbox.click();
      return;
    }

    setChecked(checkbox?.checked);
  };

  return (
    <div
      className={clsx('react-toggle', className, {
        'react-toggle--checked': checked,
        'react-toggle--focus': focused,
        'react-toggle--disabled': !isClient,
      })}
      role="button"
      tabIndex={-1}
      onClick={handleToggle}>
      <div className="react-toggle-track">
        <div className="react-toggle-track-check">
          <Dark icon={darkIcon} style={darkIconStyle} />
        </div>
        <div className="react-toggle-track-x">
          <Light icon={lightIcon} style={lightIconStyle} />
        </div>
      </div>
      <div className="react-toggle-thumb" />

      <input
        ref={inputRef}
        checked={checked}
        type="checkbox"
        className="react-toggle-screenreader-only"
        aria-label="Switch between dark and light mode"
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
}
