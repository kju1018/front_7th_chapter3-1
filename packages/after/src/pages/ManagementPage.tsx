import React, { useState } from 'react';
import { UserManagementPage } from './User/UserManagementPage.tsx';
import { PostManagementPage } from './Post/PostManagementPage.tsx';
import '../styles/components.css';

type EntityType = 'user' | 'post';

export const ManagementPage: React.FC = () => {
  const [entityType, setEntityType] = useState<EntityType>('post');

  return (
    <div style={{ minHeight: '100vh', background: '#f0f0f0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '5px',
            color: '#333'
          }}>
            관리 시스템
          </h1>
          <p style={{ color: '#666', fontSize: '14px' }}>
            사용자와 게시글을 관리하세요
          </p>
        </div>

        <div style={{
          background: 'white',
          border: '1px solid #ddd',
          padding: '10px'
        }}>
          <div style={{
            marginBottom: '15px',
            borderBottom: '2px solid #ccc',
            paddingBottom: '5px'
          }}>
            <button
              onClick={() => setEntityType('post')}
              style={{
                padding: '8px 16px',
                marginRight: '5px',
                fontSize: '14px',
                fontWeight: entityType === 'post' ? 'bold' : 'normal',
                border: '1px solid #999',
                background: entityType === 'post' ? '#1976d2' : '#f5f5f5',
                color: entityType === 'post' ? 'white' : '#333',
                cursor: 'pointer',
                borderRadius: '3px'
              }}
            >
              게시글
            </button>
            <button
              onClick={() => setEntityType('user')}
              style={{
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: entityType === 'user' ? 'bold' : 'normal',
                border: '1px solid #999',
                background: entityType === 'user' ? '#1976d2' : '#f5f5f5',
                color: entityType === 'user' ? 'white' : '#333',
                cursor: 'pointer',
                borderRadius: '3px'
              }}
            >
              사용자
            </button>
          </div>

          <div>
            {entityType === 'user' ? <UserManagementPage /> : <PostManagementPage />}
          </div>
        </div>
      </div>
    </div>
  );
};
