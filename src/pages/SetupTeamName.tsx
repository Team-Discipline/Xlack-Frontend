import styled from "styled-components";
import React, { useCallback, useState } from "react";
// import { submit } from "../variable/createWorkspace";
import axios from "axios";
import { at, backUrl, xlackUrl } from "../variable/cookie";

function SetupTeamName() {
  const [teamName, setTeamName] = useState<string>("");
  const teamNameHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTeamName(e.target.value);
    },
    [setTeamName],
  );

  const Submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(
        `${backUrl}workspace/`,
        {
          name: teamName,
        },
        {
          headers: {
            Authorization: `Bearer ${at}`,
          },
        },
      )
      .then(() => {
        window.location.href = `${xlackUrl}main`;
      })
      .catch(err => console.log(err));
  };
  return (
    <WorkspaceLayout>
      <div className="nav"></div>
      <div className="sidebar">
        <div className="sidebarTop">
          <div className="sidebarHeaderButton">
            <div className="sidebarHeaderInfo">
              <div className="teamName">{!teamName ? <div className="loadingSpacer"></div> : <span>{teamName}</span>}</div>
            </div>
          </div>
        </div>
        <div className="sidebarGroup"></div>
      </div>
      <div className="contents">
        <div className="viewContents">
          <div className="setupPage">
            <div className="setupPageContent">
              <div className="setupPageStepsCounter">1/3단계</div>
              <div className="autoclogHook">
                <h2 className="setupHeader">회사 또는 팀 이름이 어떻게 됩니까?</h2>
                <div className="setupHeaderDeprecated">Slack 워크스페이스의 이름이 됩니다. 팀이 인식할 수 있는 이름을 입력하세요.</div>
                <form onSubmit={Submit}>
                  <div>
                    <div role="presentation" className="inputCharacterCount">
                      <input
                        className="inputText"
                        spellCheck="false"
                        max="0"
                        min="0"
                        width="0"
                        id="setupTeamName"
                        name="teamName"
                        placeholder="예: Acme 마케팅 또는 Acme"
                        type="text"
                        onChange={teamNameHandler}
                      />
                      <div id="setupPageTeamNameCharacterCount" hidden>
                        50자 남음
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="nextButton">
                    다음
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
}

const WorkspaceLayout = styled.div`
  display: grid;
  grid-template-columns: 213px auto;
  grid-template-rows: 44px auto;
  grid-template-areas:
    "nav nav"
    "sidebar contents";
  overflow: visible;
  height: 100vh;
  width: 100vw;

  .nav {
    grid-area: nav;
    background: #350d36;
  }

  .sidebar {
    display: flex;
    width: 213px;
    background: #3f0e40;
    //grid-template-rows: auto;
    flex-direction: column;
    min-height: 0;
    min-width: 0;
    box-sizing: inherit;
  }

  .sidebarTop {
    align-items: stretch;
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    position: relative;
    font-size: 18px;
    font-weight: 900;
    line-height: 1.33334;
    min-height: 50px;
    background: rgb(82, 38, 83);
    color: #ffffff;

    .sidebarHeaderButton {
      outline: none;
      display: flex;
      cursor: pointer;
      padding: 12px 54px 0 16px;
      align-items: flex-start;
      min-height: inherit;
      min-width: 0;
      flex-direction: row-reverse;
      background-color: initial;
      border-color: rgb(82, 38, 83);

      .sidebarHeaderInfo {
        flex: 1;
        min-width: 0;
        box-sizing: border-box;

        .teamName {
          display: flex;
          align-items: center;
          padding-left: 4px;
          max-width: 100%;
          margin-left: -4px;

          .loadingSpacer {
            width: 65%;
            border-radius: 8px;
            height: 15px;
            background-color: #ffffff1a;
            margin-right: 16px;
            box-sizing: inherit;
          }
        }
      }
    }
  }

  .contents {
    max-height: calc(100vh - 44px);
    display: grid;
    position: relative;
    box-sizing: border-box;

    .viewContents {
      display: flex;
      min-height: 0;
      min-width: 0;
      position: relative;
      flex-direction: column;

      .setupPage {
        height: 100%;
        overflow-y: auto;

        .setupPageContent {
          display: flex;
          flex-direction: column;
          height: 100%;
          max-width: 820px;
          padding: 32px 80px 64px;

          .setupPageStepsCounter {
            flex-grow: 0;
            font-size: 13px;
            font-weight: 400;
            line-height: 1.38463;
            margin-bottom: 24px;
          }

          .autoclogHook {
            display: block;

            .setupHeader {
              margin-bottom: 8px;
              max-width: 820px;
              font-family: Slack-Larsseit, Helvetica Neue, Helvetica, Segoe UI, Tahoma, Arial, sans-serif;
              font-size: 50px;
              font-weight: 700;
              line-height: 56px;
            }

            .setupHeaderDeprecated {
              margin-bottom: 24px;
              -webkit-font-smoothing: antialiased;
              color: rgba(var(--sk_primary_foreground, 29, 28, 29), 1);
              font-size: 15px;
              font-variant-ligatures: common-ligatures;
              font-weight: 400;
              line-height: 1.46668;
            }

            .inputCharacterCount {
              position: inherit;
              box-sizing: inherit;
              z-index: 2;

              .inputText {
                font-size: 18px;
                border: 1px solid;
                border-radius: 4px;
                height: 44px;
                //box-sizing: border-box;
                line-height: 1.3333333;
                padding: 11px 46px 13px 12px;
                width: 100%;
              }
            }

            .nextButton {
              margin-top: 48px;
              min-width: 200px;
              background-color: rgb(221, 221, 221);
              transition: none !important;
              font-size: 18px;
              font-weight: 700;
              height: 44px;
              padding: 0 16px 3px;
            }
          }
        }
      }
    }
  }
`;
export default SetupTeamName;
